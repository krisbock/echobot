var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    MicrosoftAppId: process.env.BOTFRAMEWORK_APPID,
    MicrosoftAppPassword: process.env.BOTFRAMEWORK_APPSECRET 
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    //respond with user's message
    session.send("You said " + session.message.text);
});

// Serve a static web page
server.get(/.*/, restify.serveStatic({
    'directory': '.',
    'default': 'index.html'
}));