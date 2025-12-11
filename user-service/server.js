const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => console.log('User DB connected'));

const userSchema = new mongoose.Schema({ name: String, email: String });
const User = mongoose.model('User', userSchema);

app.get('/users', async (req, res) => { const users = await User.find(); res.json(users); });
app.post('/users', async (req, res) => { const user = await User.create(req.body); res.json(user); });

app.listen(process.env.PORT, () => console.log('User service running on', process.env.PORT));
