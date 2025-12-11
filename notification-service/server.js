const express = require('express');
const amqp = require('amqplib');
require('dotenv').config();

const app = express();
app.use(express.json());

let channel;
async function connectRabbit() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue('notifications');
}
connectRabbit();

app.post('/notify', async (req, res) => {
  const msg = JSON.stringify(req.body);
  channel.sendToQueue('notifications', Buffer.from(msg));
  res.json({ status: 'Message sent' });
});

app.listen(process.env.PORT, () => console.log('Notification service running on', process.env.PORT));
