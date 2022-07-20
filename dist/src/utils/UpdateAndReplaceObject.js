"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Updates document fields with values from input.
 * Requires input to be a Partial of Document's type. If it is not, then
 * the function behaviour is undefined.
 * @param input
 * @param document
 */
function updateAndReplaceObject(input, document) {
    Object.entries(input).forEach((entries) => {
        const key = entries[0];
        const val = entries[1];
        document[key] = val;
    });
}
exports.default = updateAndReplaceObject;
