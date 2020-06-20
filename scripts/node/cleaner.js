'use strict';
var _ = require('underscore');
var csv = require('fast-csv')

function Cleaner(){
	this.description = "Cleaner for parsing the csv";
	this.raw = [
		"./data/craters_fr.csv",
		"./data/craters_ipnku.csv",
		"./data/craters_prc.csv",
		"./data/craters_uk.csv",
		"./data/craters_usa1.csv",
		"./data/craters_usa2.csv",
		"./data/craters_usa3.csv",
		"./data/craters_ussr1.csv",
		"./data/craters_ussr2.csv",
		"./data/craters_ussr3.csv"
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
	csv.parseFile(raw).on("data", function(data){
    	
		var obj = {
    		"ID#" : data[0],
    		"SERIES" : data[1],
    		"SHOT" : data[2],
    		"YEAR" : data[3],
    		"MON" : data[4],
    		"DAY" : data[5],
    		"TIME" : data[6],
    		"SITE" : data[7],
    		"LAT" : data[8],
    		"LONG" : data[9]
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

