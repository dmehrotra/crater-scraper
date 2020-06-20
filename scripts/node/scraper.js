var GoogleMapsAPI = require('./node_modules/googlemaps/lib/index');
var fs = require('fs');
var cropper = require('easyimage');
var cleaner = require('./cleaner.js');
var config = require('./config.js');
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
      center:v['LAT'] + " " + v["LONG"]
    };
    var filename = '../../images/crater/' + v['SERIES'] + v['SHOT'] + v['YEAR'] + k + '.png';
    filename = filename.replace(' ', '_').replace('(', '_').replace(')', '_');
    if (!fs.existsSync(filename)) {
      n += 1;
      setTimeout(
        function(v, k, params, filename) {
          google.staticMap(params, function(err, binaryImage) {
            if (err) {
              console.log('Skipping ' + filename + '; Error: ' + err);
              return;
            }
            if (binaryImage) {
              console.log('Writing ' + filename);
              fs.writeFile(filename, binaryImage, 'binary', function(err){
                if (err) {
                  console.log('Skipping ' + filename + '; Error: ' + err);
                }
                cropper.rescrop({
                  src:v['SERIES'] + v['SHOT'] + v['YEAR'] + k, dst:v['SERIES'] + v['SHOT'] + v['YEAR'] + k,
                  width:500, height:400,
                  cropwidth:500, cropheight:350
                }).then(
                  function (err) {
                    console.log('Error: ' + err);
                  }
                );
              });
            } else {
              console.log('Skipping ' + filename + '; bad response.');
            }
          });
        },
        n * config.waitPerApiCall,
        v, k, params, filename);
    } else {
      console.log('Skipping ' + filename + '; already exists.');
    }
  });
}
