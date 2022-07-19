import {array, number, object, string, TypeOf, optional, null as zNull} from "zod";
import {union} from "zod";
import pronounsConstants from "../constants/pronouns.constants";
import specializationsConstants from "../constants/specializations.constants";
import approachesConstants from "../constants/approaches.constants";
import languagesConstants from "../constants/languages.constants";
import credentialsConstants from "../constants/credentials.constants";
import genderConstants from "../constants/gender.constants";
import provincesConstants from "../constants/provinces.constants";

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
        languages: optional(array(string().refine(
            (data) => languagesConstants.includes(data)
        ))),
        specializations: optional(array(string().refine(
            (data) => specializationsConstants.includes(data)
        ))),
        specializationDesc: optional(string()),
        approach: optional(array(string().refine(
            (data) => approachesConstants.includes(data)
        ))),
        approachDesc: optional(string()),
        credentials: optional(array(string().refine(
            (data) => credentialsConstants.includes(data)
        ))),
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