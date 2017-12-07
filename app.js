var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.beginDialog("greetings", session.message.text);
});

  bot.dialog('greetings', [
    function(session) {
      builder.Prompts.text(session, 'Salutations of the day, good madam, may I enquire your name as to call upon you hence morrow?');
    },
    function(session, results)  {
      session.endDialog(`Why thank you, kind sir, ${results.response}, since I am to marry my beau on the morrow in the morning!`);
    }
  ]);
