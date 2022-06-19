import {Request, Response} from "express";
import CounselorModel, {Counselor} from "../model/counselor.model";
import UserModel, {User} from "../model/user.model";
import {DocumentType, prop} from "@typegoose/typegoose";
import {createCounselor, findCounselors, findCounselorByUserId} from "../service/counselor.service";
import updateObject from "../utils/UpdateObject";
import {putCounselorInput} from "../schema/counselor.schema";


export async function getCounselorsHandler(req: Request, res: Response) {
    const {counselling, supervising, maxPrice, gender, specilizations, approach, languages, city, province}: {
        counselling?: boolean,
        supervising?: boolean,
        maxPrice?: number,
        gender?: string,
        specilizations?: string,
        approach?: string,
        languages?: string,
        province?: string,
        city?: string
    } = req.query;

    let refinedQuery: {
        "counselling.minPrice"?: { $lte: number },
        "supervising.minPrice"?: { $lte: number },
        gender?: { $in: string[] },
        specilizations?: { $in: string[] },
        approach?: { $in: string[] },
        languages?: { $in: string[] },
        in_person?: {
            province: string,
            city: string
        }
    } = {};

    if (counselling && maxPrice) refinedQuery["counselling.minPrice"] = {$lte: +maxPrice};
    if (supervising && maxPrice) refinedQuery["supervising.minPrice"] = {$lte: +maxPrice};
    if (gender) refinedQuery.gender = {$in: gender.split(',')};
    if (specilizations) refinedQuery.specilizations = {$in: specilizations.split(',')};
    if (approach) refinedQuery.approach = {$in: approach.split(',')};
    if (languages) refinedQuery.languages = {$in: languages.split(',')};
    if (city && province) refinedQuery.in_person = {city, province};

    return res.send(await findCounselors(refinedQuery));
}

export async function putCounselorHandler(req: Request<putCounselorInput['params'], {}, putCounselorInput['body']>, res: Response) {
    const user: Partial<DocumentType<User>> = res.locals.user;
    const input = req.body as Partial<Counselor>;
    const counselorProfile: DocumentType<Counselor> | null = await findCounselorByUserId(user._id);

    if (!counselorProfile) {
        input.user = user._id;
        input.firstName = user.firstName;
        input.lastName = user.lastName;

        try {
            await createCounselor(input);
            return res.send('Your counselor profile was successfuly created');
        } catch (e: any) {
            return res.status(400).send(e.message);
        }
    } else {
        // Todo: this will override counselors trying to change their first name and last name.
        input.firstName = user.firstName;
        input.lastName = user.lastName;

        updateObject(input, counselorProfile);
        await counselorProfile.save();
        return res.send('Your counselor profile was successfuly updated');
    }
}






















