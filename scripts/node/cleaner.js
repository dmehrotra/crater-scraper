'use strict';
var _ = require('underscore');
var csv = require('fast-csv')

function Cleaner(){
	this.description = "Cleaner for parsing the csv";
	this.raw = [
		"./data/US-1945-1963.csv",
		"./data/US-1964-1972.csv",
		"./data/US-1973-1992.csv",
		"./data/USSR-1964-1990.csv",
		"./data/UK_FRANCE_CHINA-1964-1993.csv"
		]
	this.sanitized_craters =[];
	this.clean()

}
Cleaner.prototype.clean = function(){
	var self = this;
	_.each(this.raw,function(v,i){
		prepare(v,function(obj){
			_.each(obj,function(v,i){
				self.sanitized_craters.push(v)
			})
		})
	})
}
function prepare(raw,callback){
	var c = [];
	csv.fromPath(raw).on("data", function(data){
    	
    	var obj = {
    		"SERIES" : data[0],
    		"SHOT" : data[1],
    		"YEAR" : data[2],
    		"MON" : data[3],
    		"LAT" : data[4],
    		"LONG" : data[5],
    		"HOB" : data[6],
    		"TYPE" : data[7],
    		"PUR" : data[8],
    		"CRAT" : data[9],
    		"DEVIC" : data[10],
    		"WARHEAD" : data[11]
    	}
    	c.push(obj)
 	})
 	.on("end", function(){
    	callback(c)
 	});
}
module.exports = {
	begin: function(){
		return new Cleaner()	
		}
	}

