import SpecializationModel from "../model/specialization.model";
import ApproachModel from "../model/approach.model";
import CredentialModel from "../model/credential.model";
import LanguageModel from "../model/language.model";


export async function findSpecializationByFilterName(name: string) {
    return SpecializationModel.findOne({filter: name});
}

export async function createSpecialization(name: string) {
    return SpecializationModel.create({filter: name});
}

export async function getAllSpecializations() {
    return SpecializationModel.find();
}

export async function getAllApproaches() {
    return ApproachModel.find();
}

export async function createApproach(name: string) {
    return ApproachModel.create({filter: name});
}

export async function getAllCredentials() {
    return CredentialModel.find();
}

export async function createCredential(name: string) {
    return CredentialModel.create({filter: name});
}

export async function getAllLanguages() {
    return LanguageModel.find();
}

export async function createLanguage(name: string) {
    return LanguageModel.create({filter: name});
}

export async function deleteSpecialization(name: string) {
    return SpecializationModel.deleteOne({filter: name});
}

export async function deleteApproach(name: string) {
    return ApproachModel.deleteOne({filter: name});
}

export async function deleteCredential(name: string) {
    return CredentialModel.deleteOne({filter: name});
}

export async function deleteLanguage(name: string) {
    return LanguageModel.deleteOne({filter: name});
}
