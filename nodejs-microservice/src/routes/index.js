import { Router } from 'express';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const routes = Router();

routes.use('/circuit-breaker', async (req, res) => {

    const sleepTime = process.env.SLEEP;
    const message = "Service running...";

    console.log(new Date(), `-- sleep: ${sleepTime}ms -- `, message);

    await sleep(sleepTime);     

    res.status(200).send(message);
});


export default routes;