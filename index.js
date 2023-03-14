import TelegramBot from 'node-telegram-bot-api' 
import dotenv from "dotenv";
dotenv.config();

const token = process.env.API_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/getresults(.+)/, (msg, match) => {

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