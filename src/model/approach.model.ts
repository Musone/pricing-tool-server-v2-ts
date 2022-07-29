import {getModelForClass, modelOptions, prop} from "@typegoose/typegoose";


@modelOptions({
    schemaOptions: {
        timestamps: true
    },
})
export class Approach {
    @prop({required: true, unique: true})
    filter: string;
}

const ApproachModel = getModelForClass(Approach);

export default ApproachModel;