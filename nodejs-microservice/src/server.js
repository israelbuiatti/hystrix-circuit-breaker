import express from 'express';
import 'express-async-errors'
import routes from './routes';
import cors from 'cors'

if (process.env.NODE_ENV !== 'production') {
	import 'dotenv/config';
}

console.log("==========================");
console.log("=== AMBIENTE:", process.env.NODE_ENV);
console.log("==========================");

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log('Server running on localhost:'+PORT);
});
