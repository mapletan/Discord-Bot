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
const newUsers = [];
// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
    console.log('Ready!');
    client.user.setUsername("Derp")
});

client.on('message', async message => {
	// If the msg does not start with an ! or if msg is from a bot.
	// Prevents the rest of the func from running
	//if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;
	if (message.author.bot) return;

	let messageArray = message.content.split(" ");
	let args = messageArray.slice(1);


    //if (message.content === `${prefix}ping`) {
   /* if (message.content === `${prefix}ping`) {
    	// send back "Pong." to the channel the message was sent in
    	message.channel.send('Pong.');
    }*/
    if (message.content.startsWith(`${prefix}ping`)) {
    	// send back "Pong." to the channel the message was sent in

    	let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   		if(!kUser) return message.channel.send("Pong.");

   		let userPinged = args[0];
   		let number = args[1];
   		let counter = 0;

   		console.log(userPinged);
   		console.log(number);

   		if (number > 5) {
   			message.channel.send('This number is too large.');
   			return;
   		}

   		while (counter != number) {

   			console.log(counter);

   			//setTimeout(function() { message.channel.send(`${kUser}`); }, 5000);
   			//message.channel.send(`${kUser}`);
   			message.channel.send(`Summoning ${kUser}`);
			counter++;
   		}
    	
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
		counter2+5
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
	else if (message.content.startsWith(`${prefix}kick`)) {

		let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   		if(!kUser) return message.channel.send("Can't find user!");
    	let kReason = args.join(" ").slice(22);
    	if(!kReason) kReason = "No reason"
    	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    	if(!kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    	let kickEmbed = new Discord.RichEmbed()
    	.setDescription("~Kick~")
    	.setColor("#e56b00")
    	.addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    	.addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    	.addField("Kicked In", message.channel)
    	.addField("Time", message.createdAt)
    	.addField("Reason", kReason); 

    	/*message.channel.send({
    		embed: {
    			author: {
    				name: client.user.username,
    				icon_url: client.user.avatarURL
    			},
    			title: message.content.substr("!poll ".length),
    			fields: [{
    				name: "Kicked User",
    				value: `${kUser} with ID ${kUser.id}`
    			},
    			{
    				name: "Kicked by",
    				value: `<@${message.author.id}> with ID ${message.author.id}`
    			},
    			{
    				name: "Kicked In"
    				//value: "channel"
    			},
    			{
    				name: "Reason",
    				value: `${kReason}`
    			}
    			],
    			timestamp: new Date(),
    			
     		}
     	})*/


    	let kickChannel = message.guild.channels.find(`name`, "bot-spam");
    	if(!kickChannel) return message.channel.send("Can't find incidents channel.");

    	message.guild.member(kUser).kick(kReason);
	    kickChannel.send(kickEmbed);

    	return;

	}
	else if (message.content.startsWith(`${prefix}addrole`)) {

		let roleName = args[1];
		let role = message.guild.roles.find("name", roleName);
		if(!role) return message.channel.send("That role does not exist!");
		let member = message.mentions.members.first() || message.guild.members.get(args[0]);

		member.addRole(role).catch(console.error);
	}
	else if (message.content.startsWith(`${prefix}remove`)) {

		let roleName = args[1];
		let role = message.guild.roles.find("name", roleName);
		if(!role) return message.channel.send("That role already exists!");
		let member = message.mentions.members.first();

		member.removeRole(role).catch(console.error);

	}
	else if (message.content.startsWith(`${prefix}createrole`)) {

		let roleName = args[1];
		let role = message.guild.roles.find("name", roleName);
		if(!role) return message.channel.send("That role already exists!");

		message.guild.createRole({

			data: {
				name: '${roleName}',
				hoist: true,
				mentionable: true,
			},
		})

	}
	else if (message.content === `${prefix}help`) {

		message.channel.send("same");
	}
	else if (message.content === `${prefix}no`) {

		message.channel.send("u");
	}
	else if (message.content === `${prefix}NO`) {

		message.channel.send("U");
	}
	else if (message.content.startsWith("nani")) {

		message.channel.send("WAT");
	}

});

client.on("guildMemberAdd", (member) => {

	const guild = member.guild;
	if(!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
	newUsers[guild.id].set(member.id, member.user);

	const userlist = newUsers[guild.id].map(u => u.toString()).join(" ");
	guild.channels.find("name", "welcome").send("Welcome to the server, " + userlist + "!");
	newUsers[guild.id].clear();

});

client.on("guildMemberRemove", (member) => {
	const guild = member.guild;
	guild.channels.find("name", "welcome").send("So sad to see you go, @" + member.id);
	if (newUsers[guild.id].has(member.id)) newUsers.delete(member.id);

}

);
// login to Discord with your app's token
//client.login(config.token);
client.login(token);