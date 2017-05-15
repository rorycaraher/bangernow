#!/usr/bin/env node
var request = require('request');
var opn = require('opn');

var base_url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50";
var part = "snippet";
var maxResults = "200";
var api_key = "AIzaSyBB6oieIYIjkGWVmRzyVLwrymR_-wzD4KM";
var list_id = "PLdONXlH_Zsprsgf_8YwkeIFihY_hTcqP-";

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
    console.log("Now listening to: " + titles[choice].title);
    var track_link = "https://youtu.be/" + titles[choice].id + "?list=" + list_id;
    opn(track_link,{wait: false});
}
