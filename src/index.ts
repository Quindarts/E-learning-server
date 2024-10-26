
import redisClient from './config/connectRedis';
import 'module-alias/register'
import express from 'express'
import appConfig from './config'
import ConnectMongoAtlas from './config/connectDB'
import helmet from 'helmet'
import cors from "cors"
import router from './routes'
const app = express()

const mongo = new ConnectMongoAtlas()
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())
mongo.connect()

redisClient.connect()
router(app)

app.listen(appConfig.PORT, () => {
    console.log('🚀>App listen on port:::::', appConfig.PORT)
})
