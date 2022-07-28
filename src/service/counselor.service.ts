import CounselorModel, {Counselor} from "../model/counselor.model";
import {User} from "../model/user.model";
import {DocumentType} from "@typegoose/typegoose";


export async function findCounselors(query: Object) {
    return CounselorModel.find(query);
}

export async function createCounselor(input: Partial<Counselor>) {
    return CounselorModel.create(input);
}

export async function findCounselorByUserId(userId: string) {
    return CounselorModel.findOne({user: userId});
}

export async function deleteCounselorByUserId(userId: string) {
    return CounselorModel.deleteOne({user: userId});
}