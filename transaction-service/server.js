const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => console.log('Transaction DB connected'));

const transactionSchema = new mongoose.Schema({ from: String, to: String, amount: Number });
const Transaction = mongoose.model('Transaction', transactionSchema);

app.get('/transactions', async (req, res) => { res.json(await Transaction.find()); });
app.post('/transactions', async (req, res) => { res.json(await Transaction.create(req.body)); });

app.listen(process.env.PORT, () => console.log('Transaction service running on', process.env.PORT));
