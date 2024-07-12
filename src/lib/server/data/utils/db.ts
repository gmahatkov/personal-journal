import * as mongoose from "mongoose";
import { MONGO_URL} from "$env/static/private";

export async function connect() {
    if (!MONGO_URL) throw new Error("MONGO_URL is not defined");
    const _mongoose = await mongoose.connect(MONGO_URL);
    return _mongoose.connection;
}

export async function getClient() {
    let connection: mongoose.Connection;
    if (!mongoose.connection || mongoose.connection.readyState === 0) {
        try {
            connection = await connect();
            console.log("Connected to MongoDB");
        } catch (err) {
            console.error(`Failed to connect to MongoDB:\n${err}`);
            throw new Error("Failed to connect to MongoDB");
        }
    } else {
        connection = mongoose.connection;
    }
    return connection.getClient();
}