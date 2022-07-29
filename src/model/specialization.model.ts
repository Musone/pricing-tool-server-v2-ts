import {getModelForClass, modelOptions, prop} from "@typegoose/typegoose";


@modelOptions({
    schemaOptions: {
        timestamps: true
    },
})
export class Specialization {
    @prop({required: true, unique: true})
    filter: string;
}

const SpecializationModel = getModelForClass(Specialization);

export default SpecializationModel;