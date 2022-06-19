import {AnyZodObject} from "zod";
import {NextFunction, Request, Response} from "express";
import {pick} from 'lodash';

/**
 * This middleware validates requests by checking if the body/query/params match the expected Zod schema.
 * @param schema
 */
const validateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedData = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });

        const transformedData = pick(parsedData, Object.keys(schema.shape));
        req.body = transformedData.body;
        req.params = transformedData.params;

        return next();
    } catch (e: any) {
        return res.status(400).send(e.errors);
    }
}

export default validateResource;


