"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Updates document fields with values from input. If the field is an array, adds new elements to that array.
 * Requires input to be a Partial of Document's type. If it is not, then
 * the function behaviour is undefined.
 * @param input
 * @param document
 */
function updateAndAddToObject(input, document) {
    Object.entries(input).forEach((entries) => {
        const key = entries[0];
        const val = entries[1];
        if (Array.isArray(val))
            val.forEach((v) => {
                if (document[key].indexOf(v) === -1)
                    document[key].push(v);
            });
        else
            document[key] = val;
    });
}
exports.default = updateAndAddToObject;
