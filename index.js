// import TelegramBot from 'node-telegram-bot-api' 
// import dotenv from "dotenv";
// dotenv.config();

// const token = process.env.BOT_TOKEN;
// const bot = new TelegramBot(token, { polling: true });

// bot.onText(/\/getresults(.+)/, (msg, match) => {

//     const chatId = msg.chat.id;
//     const rollNo = match[1];
//     const response = `Results of${rollNo}:

// 1-1 Sem : 9.1  
// 1-2 Sem : 8.9  
// 2-1 Sem : 8.7  
// 2-2 Sem : 7.5  
// 3-1 Sem : 8.1  
// 3-2 Sem : 7.2  
// 4-1 Sem : 8.0  
// 4-2 Sem : 9.4  
//     `;
//     bot.sendMessage(chatId, response);
// });


import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

const token = process.env.BOT_TOKEN;

// Create a bot instance
const bot = new TelegramBot(token);

// Listen for incoming messages
bot.on('message', (msg, match) => {

    const chatId = msg.chat.id;
    const rollNo = match[1];
    const response = `Results of${rollNo}:

1-1 Sem : 9.1  
1-2 Sem : 8.9  
2-1 Sem : 8.7  
2-2 Sem : 7.5  
3-1 Sem : 8.1  
3-2 Sem : 7.2  
4-1 Sem : 8.0  
4-2 Sem : 9.4  
    `;
    bot.sendMessage(chatId, response);
});

app.get('/', (req, res)=>{
    res.send({ message: 'Telegram bot for CGPAIN' });
});

// Set up a webhook route
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Bot server listening on port ${PORT}`);
});

// Set the webhook for the bot
bot.setWebHook({
  url: process.env.URL + `/bot${token}`
});

