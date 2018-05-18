// require the discord.js module
const Discord = require('discord.js');
//const config = require('./config.json');
// Below is equivalent to 
/*var _require = require('./config.json'), prefix = _require.prefix, token = _require.token; */
const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

var counter1 = 0;
var counter2 = 0;
var counter3 = 0;

var boolboi = false;
var arrayMembers = [];
// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
	// If the msg does not start with an ! or if msg is from a bot.
	// Prevents the rest of the func from running
	//if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;
	if (message.author.bot) return;

    //if (message.content === `${prefix}ping`) {
    if (message.content.startsWith(`${prefix}ping`)) {
    	// send back "Pong." to the channel the message was sent in
    	message.channel.send('Pong.');
	}
	//else if (message.content === `${prefix}beep`) {
	else if (message.content.startsWith(`${prefix}beep`)) {
    	message.channel.send('Boop.');
	}
	else if (message.content === `${prefix}server`) {
    	message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	}
	else if (message.content === '1' && boolboi) {
		counter1++;
		message.channel.send(`You have said 1, ${counter1} time(s).\n`);
	}
	else if (message.content === '2' && boolboi) {
		counter2++;
		message.channel.send(`You have said 2, ${counter2} time(s).\n`);
	}
	else if (message.content === '3' && boolboi) {
		counter3++;
		message.channel.send(`You have said 3, ${counter3} time(s).\n`);
	}
	else if (message.content === `${prefix}start`) {

		counter1 = 0;
		counter2 = 0;
		counter3 = 0;
		boolboi = true;
		message.channel.send('Starting count...');
	}
	else if (message.content === `${prefix}end`) {
		boolboi = false;
		message.channel.send('Ending count...');
	}
	else if (message.content.startsWith(`${prefix}poll`)) {

    	message.channel.send({
    		embed: {
    			author: {
    				name: client.user.username,
    				icon_url: client.user.avatarURL
    			},
    			title: message.content.substr("!poll ".length),
    			timestamp: new Date(),
    			//description: title,
    			footer: {
    				text: 'Use 👍 or 👎 reactions to vote',
        		},
     		},
 		}).then((message) => {
      		message.react("👎");
      		message.react("👍");

    	});
	}else if (message.content === `${prefix}roll`) {

		/*for (user of client.users) {
			console.log(user[1].username);
		}
		message.channel.send('<@153240057778667521>');*/
		var i;
		var count = 0;
		for (i in client.users.array()) {
			var User = client.users.array()[i];
			arrayMembers[i] = User.id; 
			console.log(User.username);
			console.log(User.id);
			count++;
		}
		var x = Math.floor(Math.random() * (count));
		console.log(i);
		console.log(count);
		console.log(x);
		
		message.channel.send(`<@${arrayMembers[x]}>`);
		console.log(message.guild.members.get(`${client.users.array()[x]}`));
		//message.channel.send(`<@${client.users.array()[x]}>`);
	}
	else if (message.content === `${prefix}random`) {
		var ran = Math.floor(Math.random()*100);
		message.channel.send(`Your random number is: ${ran}`);
	}
});

// login to Discord with your app's token
//client.login(config.token);
client.login(token);