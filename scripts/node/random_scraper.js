var GoogleMapsAPI = require('./node_modules/googlemaps/lib/index');
var fs = require('fs');
var cropper = require('easyimage');
var cleaner = require('./cleaner.js');
var config = require('./config-2.js');
var _ = require('underscore');

var google = new GoogleMapsAPI(config.googleMapsApiConfig);

var sites = cleaner.begin();

setTimeout(function() { run(sites.sanitized_craters); }, 1000);

function run(data) {
  var d = data;
  var n = 0;
  _.each(d, function(v, k) {
    var params = {
      zoom: 15,
      size: '500x400',
      maptype: 'satellite',
      center:getRandomInRange(-180, 180, 3) + " " + getRandomInRange(-180, 180, 3)
    };
    var filename = '../../images/no_crater/' +v['SERIES'] + v['YEAR'] + k + '.png';
    filename = filename.replace(' ', '_');
    if (!fs.existsSync(filename)) {
      n += 1;
      setTimeout(
        function(v, k, params, filename) {
          google.staticMap(params, function(err, binaryImage) {
            if (!binaryImage) {
              console.log('Skipping ' + filename + '; Bad response');
              return;
            }
            if (err) {
              console.log('Skipping ' + filename + '; Error: ' + err);
              return;
            }
            console.log('Writing ' + filename);
            console.log(params.center);
            fs.writeFile(filename, binaryImage, 'binary', function(err){
              cropper.rescrop({
                src:v['SERIES']+v['YEAR']+k, dst:v['SERIES']+v['YEAR']+k,
                width:500, height:400,
                cropwidth:500, cropheight:350,
              }).then(
                function (err) {
                  console.log(err);
                }
              );
            });
          });
        },
        n * config.waitPerApiCall,
        v, k, params, filename);
    } else {
      console.log('Skipping ' + filename + '; already exists.');
    }
  });
}

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}
