import { Router } from 'express';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const routes = Router();

routes.use('/circuit-breaker/:statusCode/:sleepTime', async (req, res) => {
    const { statusCode, sleepTime } = req.params;

    req.params.date = new Date();

    
    console.log(req.params);
    
    await sleep(sleepTime);

    res.status(statusCode).send("Service running...");
});




export default routes;