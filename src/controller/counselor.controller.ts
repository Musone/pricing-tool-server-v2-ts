import {Request, Response} from "express";
import {Counselor} from "../model/counselor.model";
import {User} from "../model/user.model";
import {DocumentType, errors, prop} from "@typegoose/typegoose";
import {createCounselor, findCounselors, findCounselorByUserId} from "../service/counselor.service";
import updateAndAddToObject from "../utils/UpdateAndAddToObject";
import {putCounselorInput} from "../schema/counselor.schema";
import {MongoQuery, RawQuery, parseQuery, refineQuery} from "../helper/counselor.helper";
import updateAndReplaceObject from "../utils/UpdateAndReplaceObject";
import {isNullOrUndefined} from "@typegoose/typegoose/lib/internal/utils";
import fs from "fs";
import config from "config";
import log from "../utils/logger";
import {isNull} from "lodash";
import {findUserById} from "../service/user.service";

export async function getMyCounselorProfileHandler(req: Request, res: Response) {
    const user: Partial<DocumentType<User>> = res.locals.user;
    const counselorProfile = await findCounselorByUserId(user._id);

    if (isNull(counselorProfile)) return res.sendStatus(404);
    return res.send(counselorProfile);
}

export async function getCounselorByIdHandler(req: Request, res: Response) {
    const id: string = req.params.id;

    if (isNullOrUndefined(id)) {
        return res.sendStatus(400);
    }

    try {
        const counselorProfile = await findCounselorByUserId(id);

        if (isNullOrUndefined(counselorProfile)) {
            return res.status(404).send('Couldn\'t find Counselor profile');
        }

        return res.send(counselorProfile);
    } catch {
        return res.sendStatus(500)
    }
}

export async function getCounselorsHandler(req: Request, res: Response) {
    const refinedQuery: MongoQuery = refineQuery(parseQuery(req.query as RawQuery));

    // console.debug(JSON.stringify({refinedQuery}, null, 2)  );
    // console.debug('logging from counselor.controller.ts');

    return res.send(await findCounselors(refinedQuery));
}

export async function putCounselorHandler(req: Request<putCounselorInput['params'], {}, putCounselorInput['body']>, res: Response) {
    const user: Partial<DocumentType<User>> = res.locals.user;
    const input = req.body as Partial<Counselor>;
    const id = req.params.id;
    const counselorProfile: DocumentType<Counselor> | null = await findCounselorByUserId(id);
    const userWhoOwnsProfile: DocumentType<User> | null = await findUserById(id);

    if (isNullOrUndefined(userWhoOwnsProfile)) {
        return res.status(400).send('User who owns the counselor profile could not be found.');
    }

    if (!counselorProfile) {
        input.user = userWhoOwnsProfile._id;
        input.firstName = userWhoOwnsProfile.firstName;
        input.lastName = userWhoOwnsProfile.lastName;

        try {
            await createCounselor(input);
            return res.send('Your counselor profile was successfuly created');
        } catch (e: any) {
            return res.status(400).send(e.message);
        }
    } else {
        // Todo: this will override counselors trying to change their first name and last name.
        input.firstName = userWhoOwnsProfile.firstName;
        input.lastName = userWhoOwnsProfile.lastName;

        if (!isNullOrUndefined(counselorProfile.pfp) && !isNullOrUndefined(input.pfp) && input.pfp !== counselorProfile.pfp) {
            const path = config.get('uploadLocation');

            fs.rm(`${path}${counselorProfile.pfp}`, (err) => {
                if (!isNull(err)) {
                    log.error(err);
                }
            });
        }

        // updateAndAddToObject(input, counselorProfile);
        updateAndReplaceObject(input, counselorProfile);
        await counselorProfile.save();
        return res.send('Your counselor profile was successfuly updated');
    }
}






















