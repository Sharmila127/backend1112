const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => console.log('Account DB connected'));

const accountSchema = new mongoose.Schema({ userId: String, balance: Number });
const Account = mongoose.model('Account', accountSchema);

app.get('/accounts', async (req, res) => { res.json(await Account.find()); });
app.post('/accounts', async (req, res) => { res.json(await Account.create(req.body)); });

app.listen(process.env.PORT, () => console.log('Account service running on', process.env.PORT));
