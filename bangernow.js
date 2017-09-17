#!/usr/bin/env node
var request = require('request');
var opn = require('opn');
var chalk = require('chalk');
var config = require('./config');

var base_url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50";
var api_key = config.youtube.api_key;
var list_id = config.youtube.playlist_id;

var full_url = base_url + "&playlistId=" + list_id + "&key=" + api_key;
request(full_url, function (error, response, body) {
    if (body) {
        getTracks(body);
    }
});

function getTracks(body) {
	var result_object = JSON.parse(body);
	var titles = [];
	var num_results = result_object.items.length;
	var choice = Math.floor(Math.random() * num_results);
    //result_object.items.forEach(logTitles);
    for (var i=0; i<result_object.items.length; i++) {
    	var video_details = {
    		title: result_object.items[i].snippet.title,
    		id: result_object.items[i].snippet.resourceId.videoId
    	}
    	titles.push(video_details);
    }
    console.log(chalk.magenta("Now listening to: ") + titles[choice].title);
    var track_link = "https://youtu.be/" + titles[choice].id + "?list=" + list_id;
    opn(track_link,{wait: false});
}
