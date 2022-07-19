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

export async function getMyCounselorProfileHandler(req: Request, res: Response) {
    const user: Partial<DocumentType<User>> = res.locals.user;
    const counselorProfile = await findCounselorByUserId(user._id);

    if (isNull(counselorProfile)) return res.sendStatus(404);
    return res.send(counselorProfile);
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






















