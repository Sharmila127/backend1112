const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => console.log('Auth DB connected'));

const userSchema = new mongoose.Schema({ email: String, password: String });
const User = mongoose.model('User', userSchema);

app.post('/auth/register', async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ email: req.body.email, password: hashed });
  res.json(user);
});

app.post('/auth/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid password' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

app.listen(process.env.PORT, () => console.log('Auth service running on', process.env.PORT));
