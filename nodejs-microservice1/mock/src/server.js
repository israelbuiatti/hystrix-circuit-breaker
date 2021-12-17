import express from 'express';
import 'express-async-errors'
import routes from './routes';
import cors from 'cors'
import AppError from './app/exception/AppError';
import rateLimiter from './app/middlewares/rateLimiter';
import { sign } from 'jsonwebtoken'
import authConfig from "./app/config/auth";


const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

if (process.env.NODE_ENV !== 'production') {
	import 'dotenv/config';
}


const tokenx = sign({}, authConfig.jwt.secret, {
	subject: "111",
	expiresIn: authConfig.jwt.expiresIn
});


console.log("==========================");
console.log("=== AMBIENTE:", process.env.NODE_ENV);
console.log("=== TOKEN:", tokenx);
console.log("==========================");

const app = express();

const config = require('./config/system-life');
app.use(config.middlewares.healthMid);
app.use('/', config.routers);

//app.use(rateLimiter);

app.use(cors());

app.use(express.json());
app.use(routes);


app.use((err, request, response, next) => {

	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: 'error',
			message: err.message
		})
	}

	console.log(err);

	return response.status(500).json({
		status: 'error',
		message: 'Internal server error'
	})

});

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log('Server running on localhost:'+PORT);
});
