import UserModel, {User} from "../model/user.model";
import Role from "../constants/userRoles.constants";


export async function createUser(input: Partial<User>) {
    return UserModel.create(input);
}

export async function findUserById(id: string) {
    return UserModel.findById(id);
}

export async function findUserByEmail(email: string) {
    return UserModel.findOne({email});
}

export async function getAllUsers() {
    return UserModel.find();
}

export async function deleteUserById(id: string) {
    return UserModel.deleteOne({_id: id});
}

