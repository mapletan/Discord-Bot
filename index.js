// Require the discord.js module
const Discord = require('discord.js');

const { prefix, token } = require('./config.json');

// Modules for SQL support
const sql = require('sqlite');
sql.open('./score.sqlite');

// Create a new Discord client
const client = new Discord.Client();

// Add additional files here
const ping = require('./commands/ping.js');
const timeJS = require('./commands/time.js');
const imgurJS = require('./commands/imgur.js');
const customReply = require('./commands/customReply.json');

// Cooldown for point system
const talkedRecently = new Set();

var arrayMembers = [];
const newUsers = [];

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {

    console.log('Ready!');
    client.user.setUsername('Derp');
    client.user.setActivity('you noobs <3 | https://github.com/mapletan/Discord-Bot', { type: 'WATCHING'});

});

client.on('message', async message => {

	// Ignore other bot messages
	if (message.author.bot) return;

	// Ignore other bot prefixes
	if (message.content.startsWith('!')) return;

	let messageArray = message.content.split(" ");
	let args = messageArray.slice(1);
	message.content = message.content.toLowerCase();
	let msg = message.content.slice(1);

	// All commands that start with the prefix
	if (message.content.startsWith(`${prefix}`)) {

		if (msg.startsWith('ping')) {

    		let counter = 0;
    		let pingFunc = ping.ping(message, args);

    		while (pingFunc[1] != counter) {

    			message.channel.send(pingFunc[0]);
    			counter++;
    		}
    		return;
   
		}
		else if (msg === 'server') {

			message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
			return;

		}
		else if (msg === 'random') {

			var ran = Math.floor(Math.random()*100);
			message.channel.send(`Your random number is: ${ran}`);
			return;
		}
		else if (msg.startsWith('help')) {

			message.channel.send('same');

		}

		else if (msg.startsWith('poll')) {

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
    		return;
		}

		else if (msg === 'roll') {

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

			return;
		}

		else if (msg.startsWith('kick')) {

			let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	   		if(!kUser) return message.channel.send("Can't find user!");
	    	let kReason = args.join(' ').slice(22);
	    	if(!kReason) kReason = 'No reason'
	    	if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('No can do pal!');
	    	if(!kUser.hasPermission('MANAGE_MESSAGES')) return message.channel.send("That person can't be kicked!");

	    	let kickEmbed = new Discord.RichEmbed()
	    	.setDescription('Kick~')
	    	.setColor('#e56b00')
	    	.addField('Kicked User', `${kUser} with ID ${kUser.id}`)
	    	.addField('Kicked By', `<@${message.author.id}> with ID ${message.author.id}`)
	    	.addField('Kicked In', message.channel)
	    	.addField('Time', message.createdAt)
	    	.addField('Reason', kReason); 

	    	let kickChannel = message.guild.channels.find(`name`, "bot-spam");
	    	if(!kickChannel) return message.channel.send("Can't find incidents channel.");

	    	message.guild.member(kUser).kick(kReason);
		    kickChannel.send(kickEmbed);

	    	return;

		}
		else if (msg.startsWith('addrole')) {

			let roleName = args[1];
			let role = message.guild.roles.find('name', roleName);
			if(!role) return message.channel.send('That role does not exist!');
			let member = message.mentions.members.first() || message.guild.members.get(args[0]);

			member.addRole(role).catch(console.error);

			return;
		}
		else if (msg.startsWith('remove')) {

			let roleName = args[1];
			let role = message.guild.roles.find('name', roleName);
			if(!role) return message.channel.send("That role doesn't exists!");
			let member = message.mentions.members.first();

			member.removeRole(role).catch(console.error);

			return;

		}
		else if (msg.startsWith('createrole')) {

			let roleName = args[1];
			let role = message.guild.roles.find('name', roleName);
			if(!role) return message.channel.send('That role already exists!');

			message.guild.createRole({

				data: {
					name: '${roleName}',
					hoist: true,
					mentionable: true,
				},
			})

			return;

		}
		if(msg.startsWith('imgur')) {

			let search = args;
			let link;

			if (search == null) {
				message.channel.send('error: not enough arguments');
				return;
			}

			console.log(search);

			imgurJS.imgurBot(search).then(json => {
				
				let lengthOfImagesInData = json.data.length;
				lengthOfImagesInData = Math.floor((Math.random() * lengthOfImagesInData));
				console.log(lengthOfImagesInData);

				if (lengthOfImagesInData <= 0) {

					message.channel.send(`Error: '${search}' had no results`);
					return;
				}

				if (json.data[lengthOfImagesInData].is_album) {

					console.log('is album');

					let lengthOfImagesInAlbum = json.data[lengthOfImagesInData].images.length;
					console.log(lengthOfImagesInAlbum);
					lengthOfImagesInAlbum = Math.floor((Math.random() * lengthOfImagesInAlbum));
					console.log(lengthOfImagesInAlbum);

					link = json.data[lengthOfImagesInData].images[lengthOfImagesInAlbum].link;
					console.log(link);

					let em = new Discord.RichEmbed().setImage(link);
					message.channel.send(em);

				}
				else {

					console.log('is not album');

					link = json.data[lengthOfImagesInData].link;
					console.log(link);

					let em = new Discord.RichEmbed().setImage(link);
					message.channel.send(em);
				}

			}
		);

		return;
		}
		else if(msg === 'time') {

			message.channel.send(timeJS.timeBot());
			return;

		}
		else if (msg.startsWith('math')) {

			let num1 = args[0];
			let op1 = args[1];
			let num2 = args[2];
			let ans = 0;

			console.log(num1);
			console.log(op1);
			console.log(num2);

			if (op1 == '+') {

				ans = +num1 + +num2;
				//console.log(ans);
				//message.channel.send(```assa ${num1} ${op1} ${num2} ${ans}```);
			}
			else if (op1 == '-') {

				ans = +num1 - +num2;
			}
			else if (op1 == '*') {

				ans = +num1 * +num2;
			}
			else if (op1 == '/') {

				ans = +num1 / +num2;
			}

			message.channel.send({embed: {

				color: 3447003,
				description: `${num1} ${op1} ${num2} = ${ans}`
			}});

			return;

		}

		else if (msg.startsWith('level')) {

	    	sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}" AND guildId = "${message.guild.id}"`).then(row => {
	    		if (!row) return message.reply("Your current level is 0");
	      		message.reply(`Your current level is ${row.level}`);
	    	});

	    	return;
	  	} 
	  	else if (msg.startsWith('points')) {
	    	
	    	sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}" AND guildId = "${message.guild.id}"`).then(row => {

	    		if (!row) return message.reply("sadly you do not have any points yet!");
	    		message.reply(`you currently have ${row.points} points, good going!`);
	    	});

	    	return;
	 	}
	 	else if (msg.startsWith('rank')) {

	 		sql.all(`SELECT * FROM scores WHERE guildId = "${message.guild.id}" ORDER BY points DESC`).then(row => {

	    		if (!row) return message.reply("Nobody has ever spoken in this server! :ghost:");

	    		let txt = '***Leaderboard***\n\n';

	    		// Compile a list of usernames in a server
	    		const list = client.guilds.get(message.guild.id);

	    		var memberList = {};

	    		// Save the usernames in a key/value pair
	    		list.members.forEach(member => {
	   
	    			memberList[member.user.id] = member.user.username;

	    		});

	    		// Iterate over the returned SQL rows and match it up with server nicknames
	    		for (var i = 0; i < row.length; i++) {

	    			let index = row[i].userId;
	       			let name = message.guild.members.get(row[i].userId);
	    			name = name.nickname;

	    			// If the user does not have a nickname in the server, use their username
	    			if (!name) name = memberList[row[i].userId];

	    			txt += (i+1) + ' ' + name + '\n\t Total Points: ' + row[i].points + '\t\t Level: ' + row[i].level + '\n';

	    		}

	    		message.channel.send("```" + txt + "```");

	    	});

	    	return;

	 	}

	}

	// Check for specific key words to trigger a response
	for (let key in customReply) {

		if ((message.content.includes(' '+key+' ')) ||(message.content === key) || 
			(message.content.endsWith(' '+key)) || (message.content.startsWith(key+' '))) {

			message.channel.send(customReply[key]);

			if (key == 'please' || key == 'pls' || key == 'plz') {

				var link = 'https://cdn.discordapp.com/attachments/174499265446543361/489652408675336193/SOPwao.png';
				const em = new Discord.RichEmbed().setImage(link);
				message.channel.send(em);

			}
		}

	}
	if (message.content.toLowerCase().includes("sleep")) {

		message.channel.send(`gudnite <@${message.author.id}> :zzz: :zzz: :zzz:`);
	}

	if (message.content.toLowerCase().includes(" heck ") || 
		message.content.toLowerCase().includes(" hell ") || 
		message.content.toLowerCase().includes(" fuck ")) {

		message.channel.send(`Watch your language, <@${message.author.id}>!`);

		var link = 'https://i.imgur.com/DD4Xta6.gif';
		const em = new Discord.RichEmbed().setImage(link);
		message.channel.send(em);

	}
	
	// Add a cooldown for messages being recorded as points
	if (talkedRecently.has(message.author.id)) {
        return;
    } else {

    	// Write to the SQL DB
    	sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}" AND guildId = "${message.guild.id}"`).then(row => {
	    	if (!row) {
	      		sql.run("INSERT INTO scores (userId, points, level, guildId) VALUES (?, ?, ?, ?)", [message.author.id, 1, 0, message.guild.id]);
	    	} 
	    	else {

	      		let curLevel = Math.floor(Math.sqrt((row.points+1)/10));
	      		if (curLevel > row.level) {
	        		row.level = curLevel;
	        		sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id} AND guildId = ${message.guild.id}`);
	        		message.reply(`You've leveled up to level **${curLevel}**! Congrats noob!`);
	      		}
	      		else {
	      			sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id} AND guildId = ${message.guild.id}`);
	      		}
	      		
	   		}
		}).catch(() => {
	    	console.error;
	    	sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER, guildId TEXT)").then(() => {
	      		sql.run("INSERT INTO scores (userId, points, level, guildId) VALUES (?, ?, ?, ?)", [message.author.id, 1, 0, message.guild.id]);
	    	});
	  	});

        // Adds the user to the set so that they can't talk for 5 seconds
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after timeout
          talkedRecently.delete(message.author.id);
        }, 5000);
    }
	
});

client.on("guildMemberAdd", (member) => {

	const guild = member.guild;
	if(!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
	newUsers[guild.id].set(member.id, member.user);

	const userlist = newUsers[guild.id].map(u => u.toString()).join(" ");
	guild.channels.find('name', 'welcome').send('Welcome to the server, ' + userlist + '!');
	newUsers[guild.id].clear();

	}
);

client.on("guildMemberRemove", (member) => {
	const guild = member.guild;
	guild.channels.find('name', 'welcome').send('So sad to see you go, @' + member.id);
	if (newUsers[guild.id].has(member.id)) newUsers.delete(member.id);

	}

);

// Login to Discord with your app's token
client.login(token);