import {array, number, object, string, TypeOf, optional, null as zNull} from "zod";
import {union} from "zod";
import pronounsConstants from "../constants/pronouns.constants";
import genderConstants from "../constants/gender.constants";
import provincesConstants from "../constants/provinces.constants";
import {
    approachFilters,
    credentialFilters,
    languageFilters,
    specializationFilters
} from "../controller/filters.controller";

// todo: editCounselorSchema
export const putCounselorSchema = object({
    params: object({
        id: string({
            required_error: 'Id required'
        })
    }),
    body: object({
        firstName: optional(string()),
        lastName: optional(string()),
        gender: optional(string().refine((data) => genderConstants.includes(data))),
        age: optional(number().min(19, 'Minimum age is 19').max(100, 'Maximum age is 100')),
        pronouns: optional(string().refine(
            (data) => pronounsConstants.includes(data)
        )),
        in_person: optional(union([
            object({
                city: string(),
                province: string()
            }).refine((data) => provincesConstants[data.province as keyof typeof provincesConstants]?.includes(data.city)),
            zNull()
        ])),
        languages: optional(array(string())
            .transform((data) => data.filter((value => languageFilters.includes(value))))
        ),
        specializations: optional(array(string())
            .transform((data) => data.filter((value => specializationFilters.includes(value))))
        ),
        specializationDesc: optional(string()),
        approach: optional(array(string())
            .transform((data) => data.filter((value => approachFilters.includes(value))))
        ),
        approachDesc: optional(string()),
        credentials: optional(array(string())
            .transform((data) => data.filter((value => credentialFilters.includes(value))))
        ),
        pfp: optional(string()),
        descriptionLong: optional(string()),
        introduction: optional(string()),
        janeId: optional(union([number(), zNull()])),
        counselling: optional(union([
            object({
                minPrice: number().min(0, 'No negative price'),
                maxPrice: number().min(0, 'No negative price')
            }),
            zNull()
        ])),
        supervising: optional(union([
            object({
                minPrice: number().min(0, 'No negative price'),
                maxPrice: number().min(0, 'No negative price'),
                occupancy: number().min(0, 'No negative occupancy')
            }),
            zNull()
        ])),
    })
});

export type putCounselorInput = TypeOf<typeof putCounselorSchema>;