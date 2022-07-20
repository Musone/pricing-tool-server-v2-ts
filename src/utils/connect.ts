import mongoose from 'mongoose';
import config from "config";
import log from "./logger";

export default async function connect() {
    // const dbUri: string = config.get<string>('dbUri');
    const dbUri: string = "mongodb+srv://Musone:4U2N1jDhrmnC4Z8W@pricingtool-cluster.yjalx.mongodb.net/?retryWrites=true&w=majority";

    try {
        await mongoose.connect(dbUri);
        log.info(`Connected to DB: ${dbUri}`);
    } catch (e: any) {
        process.exit(1);
    }

}