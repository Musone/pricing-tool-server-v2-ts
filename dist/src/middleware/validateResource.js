"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
/**
 * This middleware validates requests by checking if the body/query/params match the expected Zod schema.
 * @param schema
 */
const validateResource = (schema) => (req, res, next) => {
    try {
        const parsedData = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        const transformedData = (0, lodash_1.pick)(parsedData, Object.keys(schema.shape));
        req.body = transformedData.body;
        req.params = transformedData.params;
        return next();
    }
    catch (e) {
        return res.status(400).send(e.errors);
    }
};
exports.default = validateResource;
