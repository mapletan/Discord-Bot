// ***********************************************************************************
// 
// File name:   	 ping.js
// Function:    	 Takes zero or two user inputted arguments as a parameter for the number of pings (mentions) on a user
// Input Format: 	 ${prefix}ping 
//                 ${prefix}ping <@user> <# 1-5>
// Output Format:  Returns a 'Pong' or 'Summoning <@user>' for <# 1-5> times
// How to use:  	 Call this function in the main file (index.js) by initializing at the top:
//              	 const <name of const> = require('./commands/ping.js');
//              	 Use by calling:
//              	 <name of const>.<name of function>(); exports.<name of function>
//
// ***********************************************************************************

//const Discord = require('discord.js');

exports.ping = function(message, args) {

   let number = args[1];
   let counter = 0;
   let arr = ['Pong.', 1];

   let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!kUser) return arr;

   if (number > 5) {

      arr[0] = '**Error:** This number is too large.';
   	return arr;
   }
   else if (number < 0) {

      arr[0] = '**Error:** This number is too small';
      return arr;
   }
   else if (number == null) {

      arr[0] = `Summoning ${kUser}`;
   	return arr;
   }

   arr[0] = `Summoning ${kUser}`;
   arr[1] = number;

   return arr;
}
