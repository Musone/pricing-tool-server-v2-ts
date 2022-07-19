import {NextFunction, Request, Response} from "express";
import {isNullOrUndefined} from "@typegoose/typegoose/lib/internal/utils";
import {nanoid} from "nanoid";
import fs from "fs";
import {isNull} from "lodash";
import config from "config";
import log from "./logger";


export default function uploadPfp(req: Request, res: Response, next: NextFunction) {
    if (!isNullOrUndefined(req.body.pfp)) {
        const path = config.get('uploadLocation');
        const name = nanoid();
        const extension = '.jpg';

        const base64input = req.body.pfp.split(',');
        const base64header = base64input[0];
        const base64payload = base64input[1];

        return fs.writeFile(`${path}${name}${extension}`, base64payload, 'base64', (err: NodeJS.ErrnoException | null) => {
            if (isNull(err)) {
                req.body.pfp = `${name}${extension}`;
                return next();
            } else {
                log.error(err);
                return res.sendStatus(500);
            }
        });
    } else {
        return next();
    }
}