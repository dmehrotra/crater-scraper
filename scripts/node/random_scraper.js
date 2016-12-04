var GoogleMapsAPI = require('./node_modules/googlemaps/lib/index');
var fs = require('fs')
var google = new GoogleMapsAPI();
var cropper = require('easyimage')
var cleaner = require('./cleaner.js')
var _ = require('underscore')

 
var sites = cleaner.begin()

setTimeout(function() { run(sites.sanitized_craters)}, 10000)

function run(data){
  var d = data;
 console.log('su')
  _.each(d,function(v,k){
      var params = {
        zoom: 15,
        size: '500x400',
        maptype: 'satellite',
        center:getRandomInRange(-180, 180, 3) + " " + getRandomInRange(-180, 180, 3)
      };
      google.staticMap(params, function(err, binaryImage) {
        
        fs.writeFile("../test/"+v['SERIES']+v['YEAR']+k+".jpg", binaryImage, 'binary', function(err){
          if (err) throw err   
          cropper.rescrop({
               src:v['SERIES']+v['YEAR']+k, dst:v['SERIES']+v['YEAR']+k,
               width:500, height:400,
               cropwidth:500, cropheight:350,
            }).then(
            function (err) {
              console.log(err);
            }
          );
        })
      });
  })
}
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}