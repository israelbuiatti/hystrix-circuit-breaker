var express = require('express');
var router = express.Router();
const NodeHog = require('nodehog');

let isHealth = true;
let readTime = new Date(Date.now());
let isRead = () => { 
    return readTime < new Date(Date.now());
};

router.get('/read', (req, res) => {
   
    if (isRead()) {
        res.statusCode = 200;
        return res.send('Ok');
    } else {
        res.statusCode = 500;
        return res.send('Error Read');
    }   
});

router.get('/unhealth', (req, res) => {

    isHealth = false;
    res.send("OK");
});

router.get('/unreadfor/:seconds', (req, res) => {
    
    const dado = new Date(new Date(Date.now()).getTime() + (1000 * req.params.seconds));
    readTime = dado;    
    res.send("OK");
});

var healthMid = function (req, res, next) {
    
    if (isHealth) {
        next();
    } else {
        res.statusCode = 500;
        return res.send('Error Health');
    }   
};

router.get('/stress/:elemento/tempostress/:tempoStress/intervalo/:intervalo/ciclos/:ciclos', (req, res) => {

    const elemento = req.params.elemento;
    const tempoStress = req.params.tempoStress * 1000;
    const tempoFolga = req.params.tempoFolga * 1000;
    const ciclos = req.params.ciclos;
    new NodeHog(elemento, tempoStress, tempoFolga, ciclos).start();
    res.send("OK");
});

exports.routers = router;
exports.middlewares = { healthMid};