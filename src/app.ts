import 'dotenv/config';
import connect from "./utils/connect";
import express from 'express';
import config from 'config';
import log from "./utils/logger";
import router from './routes';
import deserializeUser from "./middleware/deserializeUser";


const app = express();
const port = config.get('port');

app.use(express.json());
app.use(deserializeUser);
app.use(router);

app.listen(port, () => {
    log.info(`Server is being hosted at http://localhost:${port}`);

    connect().catch((e: any) => log.error(e.messages));
});