import mongoose from 'mongoose';
import config from "config";
import log from "./logger";

export default async function connect() {
    // const dbUri: string = config.get<string>('dbUri');
    const dbUri = config.get<string>('dbUri');

    try {
        await mongoose.connect(dbUri);
        log.info(`Connected to DB: ${dbUri}`);
    } catch (e: any) {
        process.exit(1);
    }
}