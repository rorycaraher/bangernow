#!/usr/bin/env node
var request = require('request');
var opn = require('opn');
var chalk = require('chalk');
var config = require('./config');

// set up some 
var base_url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50";
var api_key = config.youtube.api_key;
var list_id = config.youtube.playlist_id;

var full_url = base_url + "&playlistId=" + list_id + "&key=" + api_key;

// make the request to the URL we prepared
// if we get a response body, run the callback
request(full_url, function (error, response, body) {
    if (body) {
        getTracks(body);
    }
});

// business time
function getTracks(body) {
    // parse the body result into JSON
	var result_object = JSON.parse(body);
    // initialise our array of tracks
	var tracks = [];
    // get the number of results returned
	var num_results = result_object.items.length;
    // select a random number within the range of our number of results
	var choice = Math.floor(Math.random() * num_results);

    // loop over all our results
    for (var i=0; i<result_object.items.length; i++) {
        // make an object with title and id for each track
    	var video_details = {
    		title: result_object.items[i].snippet.title,
    		id: result_object.items[i].snippet.resourceId.videoId
    	}
        // push that object onto our array of tracks
        tracks.push(video_details);
    }
    console.log(chalk.magenta("Now listening to: ") + tracks[choice].title);
    var track_link = "https://youtu.be/" + tracks[choice].id + "?list=" + list_id;
    opn(track_link,{wait: false});
}
