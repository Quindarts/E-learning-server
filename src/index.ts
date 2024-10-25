import express from 'express';
import appConfig from './config';
import ConnectMongoAtlas from './config/connectDB';
import helmet from 'helmet';
import cors from "cors";
import router from './routes';
import https from 'https';
import fs from 'fs';
import path from 'path';

const app = express();
const mongo = new ConnectMongoAtlas();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
mongo.connect();

router(app);

const certPath = path.join(process.cwd(), 'src\\cert');
const httpsOptions = {
    key: fs.readFileSync(path.join(certPath, 'localhost-key.pem')),
    cert: fs.readFileSync(path.join(certPath, 'localhost.pem')),
};

// Khởi động server HTTPS
https.createServer(httpsOptions, app).listen(appConfig.PORT, () => {
    console.log('🚀> HTTPS Server is running on port:', appConfig.PORT);
});
