// ***********************************************************************************
// 
// File name:   time.js
// Function:    Tells the time in PDT, HST, in the Phillipines, and Sydney, Australia
// Format:      Day of week, DD MMMM YYYY HH:MM AM/PM
// How to use:  Call this function in the main file (index.js) by initializing at the top:
//              const timeJS = require('./commands/time.js');
//              Use by calling timeBot by:
//              timeJS.timeBot();
//
// ***********************************************************************************

// Require the discord.js module for using RichEmbed
const Discord = require('discord.js');

exports.timeBot = function() {

	const dayofweek = ['Sunday','Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
	const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

	const PST = new Date();
	const HST = new Date();
	const Phill = new Date();
	const AEST = new Date();

	PST.setUTCHours(PST.getUTCHours() - 7);
	HST.setUTCHours(HST.getUTCHours() - 10);
	Phill.setUTCHours(Phill.getUTCHours() + 8);
	AEST.setUTCHours(AEST.getUTCHours() + 10);

	const PST_AMPM = checkAMPM(PST);
	const HST_AMPM = checkAMPM(HST);
	const PHILL_AMPM = checkAMPM(Phill);
	const AEST_AMPM = checkAMPM(AEST);
	
	const titleHour = hours[checkHours(PST_AMPM, PST)];
    
	const embed = new Discord.RichEmbed()
		.setTitle(':clock'+titleHour+': Times')
		.addField(':penguin: PDT', dayofweek[PST.getUTCDay()] + ', ' 
		    + PST.getUTCDate() + ' ' + months[PST.getUTCMonth()] 
		    + ' ' + PST.getUTCFullYear() + ' '  
		    + hours[checkHours(PST_AMPM, PST)] 
		    + ':' + checkMins(PST)  
		    + checkAMPMtxt(PST_AMPM) + ' PDT')
		.addField(':palm_tree: Hawaii', dayofweek[HST.getUTCDay()] 
		    + ', ' + HST.getUTCDate() + ' ' + months[HST.getUTCMonth()] 
		    + ' ' + HST.getUTCFullYear() + ' '  
		    + hours[checkHours(HST_AMPM, HST)] 
		    + ':' + checkMins(HST) 
		    + checkAMPMtxt(HST_AMPM) + ' HST')
		.addField(':flag_ph: Philippines', dayofweek[Phill.getUTCDay()] + ', ' 
		    + Phill.getUTCDate() + ' ' + months[Phill.getUTCMonth()] 
		    + ' ' + Phill.getUTCFullYear() + ' '  
		    + hours[checkHours(PHILL_AMPM, Phill)] 
			+ ':' + checkMins(Phill) 
			+ checkAMPMtxt(PHILL_AMPM) + ' GMT+8')
		.addField(':flag_au: Australia', dayofweek[AEST.getUTCDay()] + ', ' 
		    + AEST.getUTCDate() + ' ' + months[AEST.getUTCMonth()] 
		    + ' ' + AEST.getUTCFullYear() + ' '  
		    + hours[checkHours(AEST_AMPM, AEST)] 
			+ ':' + checkMins(AEST) 
			+ checkAMPMtxt(AEST_AMPM) + ' GMT+10');
	
	return embed;

}

function checkAMPM(timezone) {

	return (timezone.getUTCHours() >= 12);
}
function checkAMPMtxt(AMPM) {
    
    return ((AMPM)? " PM":" AM");
}
function checkMins(timezone) {
    
    return ((timezone.getUTCMinutes() < 10) ? '0'+timezone.getUTCMinutes():timezone.getUTCMinutes());
}
function checkHours(AMPM, timezone) {
    
    return ((AMPM) ? timezone.getUTCHours() - 12: timezone.getUTCHours());
}