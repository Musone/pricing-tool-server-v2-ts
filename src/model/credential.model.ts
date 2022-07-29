import {getModelForClass, modelOptions, prop} from "@typegoose/typegoose";


@modelOptions({
    schemaOptions: {
        timestamps: true
    },
})
export class Credential {
    @prop({required: true, unique: true})
    filter: string;
}

const CredentialModel = getModelForClass(Credential);

export default CredentialModel;