/* Copyright Justin Klein 2023
* This bot is designed to be used with Google Sheets to assign roles in a Discord server. 
* Unauthorized use of the bot or its code is prohibited.
*/
require('dotenv').config();
const Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = "debug";

const bot = new Discord.Client({
  token: process.env.BOT_TOKEN, 
  autorun: true
});

bot.on('ready', () => {
  logger.info(`Connected as ${bot.username} (ID: ${bot.id})`);
});

bot.on('message', (user, userID, channelID, message, evt) => {
  if (message.substring(0, 1) === '$') {
    var query = message.substring(1).split(' ');
    var command = query[0];
    query = query.splice(1);
    switch (command) {
      case 'ping':
        bot.sendMessage({
          to: channelID,
          message: 'pong'
        });
        break;
    }
  }
});



// if (message.content === '!listSpreadsheets') {
  //   try {
  //     const authClient = await auth.getClient({
  //       keyFile: 'C:/Users/justi/Documents/spreadsheet/spreadsheet-discord-bot-398904-c53b52780ec8.json',
  //       scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
  //     });

  //     const drive = google.drive({ version: 'v3', auth: authClient });
  //     const folderId = '0AIaYZYW9uAy7Uk9PVA';
  //     const query = `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.spreadsheet'`;

  //     const driveResponse = await drive.files.list({ q: query });

  //     if (driveResponse.data.files.length > 0) {
  //       let spreadsheetNames = '';
  //       for (const file of driveResponse.data.files) {
  //         spreadsheetNames += `${file.name}\n`;
  //       }
  //       message.channel.send(`Found the following spreadsheets in the shared folder:\n${spreadsheetNames}`);
  //     } else {
  //       message.channel.send('No spreadsheets found in the shared folder.');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //     message.channel.send('An error occurred while listing spreadsheets.');
  //   }
  // }