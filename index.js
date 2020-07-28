const Telegrambot = require('node-telegram-bot-api');  //Objet criado
const dialogFlow = require('./dialogflow');
const youtube = require('./youtube');

const token = '1191867107:AAE55XiTPSItBv4SSxyGqzdgdXVzm8Z1Z0k'; //Token informad pelo Telegram

//Conectar ao bot do telegram via polling
const bot = new Telegrambot(token, { polling: true});

//Escutar a mensagem
bot.on('message',async function (msg){
    const chatId = msg.chat.id; //Identificador da conversa
    console.log(msg.text);

    const dfResponse = await dialogFlow.sendMessage(chatId.toString(),msg.text);

    let responseText = dfResponse.text;
    if (dfResponse.intent == 'Treino Especifico')
    {
        responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.corpo.stringValue);
        
    }
    bot.sendMessage(chatId,responseText);
});