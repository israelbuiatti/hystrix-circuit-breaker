import { Router } from 'express';
import os from 'os';
import AppError from '../app/exception/AppError';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const routes = Router();
//routes.use(ensureAuthenticated);

const health = {
    app: "mock-backend",
    version: "3.0",
    status: true,
    hostname: os.hostname()
}

routes.get('/health', (req, res) => res.send(health));





routes.use('/upload', async (req, res) => {

    const randomError = getRandomArbitrary(1, 10);

    if (randomError == 1) {
        throw new AppError('Bad request', 400);
    }
    if (randomError == 2) {
        throw new AppError('Internal Server Error', 500);
    }

    const responseTime = getRandomArbitrary(100, 5000);
    await sleep(responseTime);

    res.send({ responseTime })
});


routes.use('/circuit-breaker/:statusCode/:sleepTime', async (req, res) => {
    const { statusCode, sleepTime } = req.params;
    
    await sleep(sleepTime);

    res.status(statusCode).send({ result: "OK" });
});




export default routes;