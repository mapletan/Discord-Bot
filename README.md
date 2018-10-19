# Discord-Bot

*WORK IN PROGRESS*

A Discord Bot for miscellaneous things.



Currently includes:
- add and remove existing roles to members
- kick members
- polls
- spam ping members
- random number generator
- random member selection
- basic math functionality (+ - / *)
- display time in 4 different timezones
- miscellaneous responses to certain messages
- random image grab from Imgur API based on search query
- point and leveling system with cooldown for messages being recorded as points, with results saved in local SQLite DB

## Prerequisites
- Node.js (version 7.6 or higher)
- Discord.js
- node-fetch module (for Imgur API)
- SQLite Client for Node.js Apps

## Installation
1. Create a Discord application and a Bot User here:
   - https://discordapp.com/developers/applications/
2. Add your bot to a server with this link and replace `CLIENT_ID` with the Client ID on your application page
   - https://discordapp.com/oauth2/authorize?client_id=Client_ID&scope=bot
3. To add Imgur support, get a client ID from Imgur's Add Client page:
   - https://api.imgur.com/oauth2/addclient? 
   
   with the callback URL:
   - https://www.getpostman.com/oauth2/callback
3. Rename `config.json.txt` to `config.json` and add your bot token and client ID in the quotations
4. Rename `customReply.txt` to `customReply.json` and add in your own triggers and responses
5. Use Command Prompt (cmd) to navigate to the folder where `index.js` is
6. Launch the bot with

      ```node index.js```
### Tested and Developed on
- Node.js v8.11.1
- Windows 10
