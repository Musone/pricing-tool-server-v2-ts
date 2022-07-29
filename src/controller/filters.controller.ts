import {Request, Response} from "express";
import {
    createApproach, createCredential, createLanguage,
    createSpecialization, deleteApproach, deleteCredential, deleteLanguage, deleteSpecialization,
    findSpecializationByFilterName,
    getAllApproaches, getAllCredentials, getAllLanguages,
    getAllSpecializations
} from "../service/filters.service";
import {isNullOrUndefined} from "@typegoose/typegoose/lib/internal/utils";
import genderConstants from "../constants/gender.constants";
import pronounsConstants from "../constants/pronouns.constants";
import provincesConstants from "../constants/provinces.constants";


/*async function genericHandler(req: Request, res: Response, filterName: string, findFunction: (name: string) => Promise<any>, createFunctionfindFunction: (name: string) => Promise<any>) {
    const filter: DocumentType<{ filter: string, active: boolean }> | null = await findFunction(filterName);
    try {
        if (!isNullOrUndefined(filter)) {

            if (filter.active) {
                return res.status(409).send('Filter already exists')
            }

            filter.active = true;
            await filter.save();
            return res.send('Filter re-activated');
        } else {
            await createFunctionfindFunction(filterName);
            return res.send('Filter added');
        }
    } catch (e: any) {
        return res.status(500).send(e);
    }
}*/

export let specializationFilters: string[] = [];
getAllSpecializations()
    .then((data) => {
        data.forEach((document) => specializationFilters.push(document.filter));
    })

export let approachFilters: string[] = [];
getAllApproaches()
    .then((data) => {
        data.forEach((document) => approachFilters.push(document.filter));
    })

export let credentialFilters: string[] = [];
getAllCredentials()
    .then((data) => {
        data.forEach((document) => credentialFilters.push(document.filter));
    })

export let languageFilters: string[] = [];
getAllLanguages()
    .then((data) => {
        data.forEach((document) => languageFilters.push(document.filter));
    })

async function genericAddHandler(res:Response, filter:string, createFunction: (filterName: string) => Promise<any>, addToMemoryFunction: (filterName: string) => void) {
    try {
        await createFunction(filter);
        addToMemoryFunction(filter);
        return res.send('Filter added');
    } catch (e: any) {
        if (e.code === 11000) {
            return res.status(409).send('Filter already exists');
        }
        return res.status(500).send(e);
    }
}

async function genericDeleteHandler(res: Response, filter: string, deleteFunction: (filterName: string) => Promise<any>, removeFromMemoryfunction: (filterName: string) => void) {
    try {
        await deleteFunction(filter);
        removeFromMemoryfunction(filter);
        return res.send('Filter successfully deleted');
    } catch (e: any) {
        return res.sendStatus(500);
    }
}

export async function handleGetFilters(req: Request, res: Response) {
    res.send({
        genderConstants,
        pronounsConstants,
        provincesConstants,
        languageFilters,
        specializationFilters,
        approachFilters,
        credentialFilters,
    })
}

export async function handleAddSpecialization(req: Request, res: Response) {
    const filter = req.body?.filter;

    if (isNullOrUndefined(filter)) {
        return res.status(400).send('body.filter required')
    }

    const filterTransformed = filter.trim();

    return await genericAddHandler(res, filterTransformed, createSpecialization, (filterName: string) => specializationFilters.push(filterName));
}

export async function handleAddApproach(req: Request, res: Response) {
    const filter = req.body?.filter;

    if (isNullOrUndefined(filter)) {
        return res.status(400).send('body.filter required')
    }

    const filterTransformed = filter.trim();

    return await genericAddHandler(res, filterTransformed, createApproach, (filterName: string) => approachFilters.push(filterName));
}

export async function handleAddCredential(req: Request, res: Response) {
    const filter = req.body?.filter;

    if (isNullOrUndefined(filter)) {
        return res.status(400).send('body.filter required')
    }

    const filterTransformed = filter.trim();

    return await genericAddHandler(res, filterTransformed, createCredential, (filterName: string) => credentialFilters.push(filterName));
}

export async function handleAddLanguage(req: Request, res: Response) {
    const filter = req.body?.filter;

    if (isNullOrUndefined(filter)) {
        return res.status(400).send('body.filter required')
    }

    const filterTransformed = filter.trim();

    return await genericAddHandler(res, filterTransformed, createLanguage, (filterName: string) => languageFilters.push(filterName));
}


export async function handleDeleteSpecialization(req: Request, res: Response) {
    const filter = req.params.filter;

    if (isNullOrUndefined(filter)) {
        return res.sendStatus(400);
    }

    return genericDeleteHandler(res, filter, deleteSpecialization, (filterName) => specializationFilters = specializationFilters.filter((val) => val !== filterName));
}

export async function handleDeleteApproach(req: Request, res: Response) {
    const filter = req.params.filter;

    if (isNullOrUndefined(filter)) {
        return res.sendStatus(400);
    }

    return genericDeleteHandler(res, filter, deleteApproach, (filterName) => approachFilters = approachFilters.filter((val) => val !== filterName));
}

export async function handleDeleteCredential(req: Request, res: Response) {
    const filter = req.params.filter;

    if (isNullOrUndefined(filter)) {
        return res.sendStatus(400);
    }

    return genericDeleteHandler(res, filter, deleteCredential, (filterName) => credentialFilters = credentialFilters.filter((val) => val !== filterName));
}

export async function handleDeleteLanguage(req: Request, res: Response) {
    const filter = req.params.filter;

    if (isNullOrUndefined(filter)) {
        return res.sendStatus(400);
    }

    return genericDeleteHandler(res, filter, deleteLanguage, (filterName) => languageFilters = languageFilters.filter((val) => val !== filterName));
}