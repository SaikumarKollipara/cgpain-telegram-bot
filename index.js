import TelegramBot from "node-telegram-bot-api";
import express from "express";
import bodyParser from 'body-parser'
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const token = process.env.BOT_TOKEN;

// Create a bot instance
const bot = new TelegramBot(token);

// Listen for incoming messages
bot.onText(/.*/, msg => {
    const message = msg.text;
    const chatID = msg.chat.id;
    console.log('From:', msg.from.first_name, msg.from.last_name);
    console.log('Message:', message);
    let response;
    if (/\/start/.test(message)) {
        response = 'Hello, welcome to CGPA IN BOT 👋 \nTry entering your roll number to get the results of all semesters.\nTry \\help to get the list of all commands.';
        
    } else if (/^\d{3}\w\d\w\d{4}$/.test(message)) {
        // Matches rollNo
        response = `Results of ${message}: \n\n1-1 Sem : 9.1\n1-2 Sem : 8.9 \n2-1 Sem : 8.7 \n2-2 Sem : 7.5 \n3-1 Sem : 8.1 \n3-2 Sem : 7.2 \n4-1 Sem : 8.0 \n4-2 Sem : 9.4`

    } else {
        response = 'Sorry, I didn\'t understand that.';
    }
    bot.sendMessage(chatID, response);
})

app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send({ message: "Telegram bot for CGPAIN" });
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
bot.setWebHook( process.env.URL + `/bot${token}`)
.then(() => {
    console.log("Webhook set successfully");
}).catch((err) => {
    console.error("Error setting webhook", err);
});
