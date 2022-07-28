import {isNull, isUndefined} from "lodash";
import {Schema, Types} from "mongoose";



export interface RawQuery {
    counselling?: string,
    supervising?: string,
    maxPrice?: string,
    gender?: string,
    specializations?: string,
    approach?: string,
    languages?: string,
    province?: string,
    city?: string
}

export interface ParsedQuery {
    counselling: boolean,
    supervising: boolean,
    maxPrice: number | null,
    gender: string | null,
    specializations: string | null,
    approach: string | null,
    languages: string | null,
    province: string | null,
    city: string | null
}

export interface MongoQuery {
    "counselling.minPrice"?: { $lte: number },
    "supervising.minPrice"?: { $lte: number },
    gender?: { $in: string[] },
    specializations?: { $all: string[] },
    approach?: { $all: string[] },
    languages?: { $in: string[] },
    in_person?: {
        province: string,
        city: string
    }
}

export function parseQuery(rawQuery: RawQuery): ParsedQuery {
    return {
        counselling: (rawQuery.counselling === 'true'),
        supervising: (rawQuery.supervising === 'true'),
        maxPrice: isUndefined(rawQuery.maxPrice) ? null : parseInt(rawQuery.maxPrice),
        gender: isUndefined(rawQuery.gender) ? null : rawQuery.gender,
        specializations: isUndefined(rawQuery.specializations) ? null : rawQuery.specializations,
        approach: isUndefined(rawQuery.approach) ? null : rawQuery.approach,
        languages: isUndefined(rawQuery.languages) ? null : rawQuery.languages,
        province: isUndefined(rawQuery.province) ? null : rawQuery.province,
        city: isUndefined(rawQuery.city) ? null : rawQuery.city,
    }
}

export function refineQuery(parsedQuery: ParsedQuery): MongoQuery {
    const { counselling, supervising, maxPrice, gender, specializations, approach, languages, city, province }
        = parsedQuery;

    let refinedQuery: MongoQuery = {};

    if (counselling && !isNull(maxPrice) && !isNaN(maxPrice)) refinedQuery["counselling.minPrice"] = {$lte: +maxPrice};
    if (supervising && !isNull(maxPrice) && !isNaN(maxPrice)) refinedQuery["supervising.minPrice"] = {$lte: +maxPrice};
    if (!isNull(gender)) refinedQuery.gender = {$in: gender.split(',')};
    if (!isNull(specializations)) refinedQuery.specializations = {$all: specializations.split(',')};
    if (!isNull(approach)) refinedQuery.approach = {$all: approach.split(',')};
    if (!isNull(languages)) refinedQuery.languages = {$in: languages.split(',')};
    if (!isNull(city) && !isNull(province)) refinedQuery.in_person = {city, province};

    return refinedQuery
}