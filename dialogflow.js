const dialogflow = require('dialogflow');

const configs = require('./dio-bot-fit.json');

//Definido uma sessao do cliente
const sessionClient = new dialogflow.SessionsClient({
    projectId: configs.project_id,
    credentials: {
        private_key: configs.private_key,
        client_email: configs.client_email
    }
});

//definindo uma sessão para o usuario
async function sendMessage(chatId,message){

    //Session especifico para cada cliente
    const sessionPath = sessionClient.sessionPath(configs.project_id,chatId);
    const request = {
        session: sessionPath,
        queryInput: {//Define se é texto/evento/etc
            text:{
                text:message,
                languageCode:'pt-BR'
            }
        }
    }

    const responses = await sessionClient.detectIntent(request);
    //DialogFlow pode retornar varias resposta em uma variavel apenas
    const result = responses[0].queryResult;
    console.log(JSON.stringify(result,null,2));
    return {
        text: result.fulfillmentText,
        intent: result.intent.displayName,
        fields: result.parameters.fields
    };
    
   
};

module.exports.sendMessage = sendMessage;
