// ***********************************************************************************
// 
// File name:   	imgur.js
// Function:    	Takes one user inputted argument as a search query on the Imgur API
// Input Format: 	${prefix}imgur <one word search query> 
// Output Format:   Returns a Promise
// How to use:  	Call this function in the main file (index.js) by initializing at the top:
//              	const imgurJS = require('./commands/imgur.js');
//              	Use by calling timeBot by:
//              	imgurJS.imgurBot();
//
// ***********************************************************************************

// Require the node-fetch module to use fetch with the Imgur API
const fetch = require('node-fetch');

// Client ID for Imgur API
const {client_id} = require('./../config.json');

exports.imgurBot = function(search) {

	let url = 'https://api.imgur.com/3/gallery/search/top/1/?q=' + search;

	return fetch(url, {headers: {
			'Authorization': 'Client-ID ' + client_id
			}
		})
		.then(res => res.json())
}
