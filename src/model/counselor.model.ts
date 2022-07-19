import {getModelForClass, index, modelOptions, prop, Ref, Severity} from "@typegoose/typegoose";
import {User} from "./user.model";


@index({user: 1})
@modelOptions({
    schemaOptions: {
        timestamps: true
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class Counselor {
    @prop({required: true, ref: () => User})
    user: Ref<User>;

    @prop({required: true, lowercase: true})
    firstName: string;

    @prop({required: true, lowercase: true})
    lastName: string;

    @prop({required: true})
    gender: string;

    @prop({required: true})
    age: number;

    @prop({required: true})
    pronouns: string;

    @prop({default: null})
    in_person: {city: string, province: string} | null;

    @prop({default: []})
    languages: string[];

    @prop({default: []})
    specializations: string[];

    @prop({default: ''})
    specializationDesc: string;

    @prop({default: []})
    approach: string[];

    @prop({default: ''})
    approachDesc: string;

    @prop({default: []})
    credentials: string[];

    @prop()
    pfp: string;

    @prop({default: ''})
    descriptionLong: string;

    @prop({default: ''})
    introduction: string;

    @prop({default: null})
    janeId: number | null;

    @prop({default: null})
    counselling: {minPrice: number, maxPrice: number} | null;

    @prop({default: null})
    supervising: {minPrice: number, maxPrice: number, occupancy: number} | null;
}

const CounselorModel = getModelForClass(Counselor);

export default CounselorModel;