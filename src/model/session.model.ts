import {getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import {User} from "./user.model";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Session {
    @prop({required: true, ref: () => User})
    user: Ref<User>;

    @prop({required: true, default: true})
    valid: boolean;

    @prop({required: true})
    userAgent: string;
}

const SessionModel = getModelForClass(Session);

export default SessionModel;