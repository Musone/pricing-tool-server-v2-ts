"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refineQuery = exports.parseQuery = void 0;
const lodash_1 = require("lodash");
function parseQuery(rawQuery) {
    return {
        counselling: (rawQuery.counselling === 'true'),
        supervising: (rawQuery.supervising === 'true'),
        maxPrice: (0, lodash_1.isUndefined)(rawQuery.maxPrice) ? null : parseInt(rawQuery.maxPrice),
        gender: (0, lodash_1.isUndefined)(rawQuery.gender) ? null : rawQuery.gender,
        specilizations: (0, lodash_1.isUndefined)(rawQuery.specilizations) ? null : rawQuery.specilizations,
        approach: (0, lodash_1.isUndefined)(rawQuery.approach) ? null : rawQuery.approach,
        languages: (0, lodash_1.isUndefined)(rawQuery.languages) ? null : rawQuery.languages,
        province: (0, lodash_1.isUndefined)(rawQuery.province) ? null : rawQuery.province,
        city: (0, lodash_1.isUndefined)(rawQuery.city) ? null : rawQuery.city,
    };
}
exports.parseQuery = parseQuery;
function refineQuery(parsedQuery) {
    const { counselling, supervising, maxPrice, gender, specilizations, approach, languages, city, province } = parsedQuery;
    let refinedQuery = {};
    if (counselling && !(0, lodash_1.isNull)(maxPrice) && !isNaN(maxPrice))
        refinedQuery["counselling.minPrice"] = { $lte: +maxPrice };
    if (supervising && !(0, lodash_1.isNull)(maxPrice) && !isNaN(maxPrice))
        refinedQuery["supervising.minPrice"] = { $lte: +maxPrice };
    if (!(0, lodash_1.isNull)(gender))
        refinedQuery.gender = { $in: gender.split(',') };
    if (!(0, lodash_1.isNull)(specilizations))
        refinedQuery.specilizations = { $all: specilizations.split(',') };
    if (!(0, lodash_1.isNull)(approach))
        refinedQuery.approach = { $all: approach.split(',') };
    if (!(0, lodash_1.isNull)(languages))
        refinedQuery.languages = { $in: languages.split(',') };
    if (!(0, lodash_1.isNull)(city) && !(0, lodash_1.isNull)(province))
        refinedQuery.in_person = { city, province };
    return refinedQuery;
}
exports.refineQuery = refineQuery;
