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

// export async function updateUser(userId: string, input: Partial<User>) {
//     const {roles, email, firstName, lastName, password} = input;
//     return UserModel.updateOne(
//         {_id: userId}, {
//             $addToSet: (roles ? {roles} : {}),
//             $Set: {
//                 email:
//                     {
//                         $cond: {if: {$allElementsTrue: ['$email']}, then: email}
//                     }
//             },
//         }
//     )
// }