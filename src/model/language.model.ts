import {getModelForClass, modelOptions, prop} from "@typegoose/typegoose";


@modelOptions({
    schemaOptions: {
        timestamps: true
    },
})
export class Language {
    @prop({required: true, unique: true})
    filter: string;
}

const LanguageModel = getModelForClass(Language);

export default LanguageModel;