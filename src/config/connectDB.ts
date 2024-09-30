import appConfig from ".";
import mongoose from "mongoose";

abstract class ConnectionDB {
    constructor() { }
    protected async connect() { }
}

class ConnectMongoAtlas extends ConnectionDB {
    constructor() {
        super()
    }
    public async connect() {
        try {
            await mongoose.connect(`${appConfig.db.url}`)
            console.log('🚀 ~~~ connected to Atlas::::E-learning ')
        } catch (error) {
            console.log("🚀 ~ ConnectMongoAtlas ~ connect ~ error:", error)
        }
    }
}
export default ConnectMongoAtlas
