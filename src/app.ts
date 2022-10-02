import 'dotenv/config';
import connect from "./utils/connect";
import express from 'express';
import config from 'config';
import log from "./utils/logger";
import router from './routes';
import deserializeUser from "./middleware/deserializeUser";
import cors from 'cors';

const app = express();
const port: number = config.get('port');
const clientUrl: string = config.get('clientUrl');

app.use(cors({
    origin: '*',
}));
app.use(express.json({limit: '5mb'}));
app.use(deserializeUser);
app.use(router);
app.use(express.static(config.get('uploadLocation')))

app.listen(port, () => {
    if (process.env.NODE_ENV === 'production') {
        // log.info(`Server is being hosted at https://phare-counselor-finder-api.com:${port}`);
        log.info(`Server is being hosted at https://us-central1-phare-app-6fd56.cloudfunctions.net/app:${port}`);
    } else {
        log.info(`Server is being hosted at http://localhost:${port}`);
    }
    log.info(`Active NODE_ENV: ${process.env.NODE_ENV}`);
    log.info(`Sending client redirects to: ${clientUrl}`);
    connect().catch((e: any) => log.error(e.messages));
});

export default app;