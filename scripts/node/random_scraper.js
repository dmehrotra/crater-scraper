var GoogleMapsAPI = require('./node_modules/googlemaps/lib/index');
var fs = require('fs');
var cropper = require('easyimage');
var cleaner = require('./cleaner.js');
var config = require('./config.js');
var _ = require('underscore');
var turf = require('turf');
var getCoords = require('@turf/invariant').getCoords;
var google = new GoogleMapsAPI(config.googleMapsApiConfig);

var sites = cleaner.begin();

setTimeout(function() { run(sites.sanitized_craters); }, 1000);

function run(data) {
  var d = data;
  var picker = new PointPicker(d);
  var n = 0;
  _.each(d, function(v, k) {
    // Find an image near the crater that doesn't actually contain the
    // crater. For each known crater, we choose a random point that is
    // between 5 and 20 miles from that crater, and is no closer than
    // 5 miles to any other known craters.
    var p = picker.nearbyPoint(v, 5, 20, 1000);
    var coords = getCoords(p);
    var center = coords[1].toFixed(6) + ' ' + coords[0].toFixed(6);
    var params = {
      zoom: 15,
      size: '500x400',
      maptype: 'satellite',
      center: center
    };
    var filename = '../../images/no_crater/' + v['SERIES'] + v['SHOT'] + v['YEAR'] + k + '.png';
    filename = filename.replace(' ', '_').replace('(', '_').replace(')', '_');
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
                src:v['SERIES'] + v['SHOT'] + v['YEAR'] + k, dst:v['SERIES'] + v['SHOT'] + v['YEAR'] + k,
                width:500, height:400,
                cropwidth:500, cropheight:350
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

function PointPicker(d) {
  this.points = _.map(
    d,
    function(v) {
      var p = turf.point([v['LONG'], v['LAT']]);
      return p;
    });
}

PointPicker.prototype.nearbyPoint = function(d, minDist, maxDist, maxIter) {
  return this.nearbyPointIter(turf.point([d['LONG'], d['LAT']]), minDist, maxDist, maxIter, 0);
};

PointPicker.prototype.nearbyPointIter = function(p, minDist, maxDist, maxIter, iter) {
  if (iter > maxIter) {
    return null;
  }
  var dist = getRandomInRange(minDist, maxDist);
  var bearing = getRandomInRange(-180, 180);
  var dest = turf.destination(p, dist, bearing, 'miles');
  if (this.tooClose(dest, minDist)) {
    return this.nearbyPointIter(p, minDist, maxDist, maxIter, iter + 1);
  } else {
    return dest;
  }
};

PointPicker.prototype.tooClose = function(p, minDist) {
  var points = this.points;
  var closestDistance = 10000;
  for (var i = 0; i < points.length; i++) {
    var distance = turf.distance(p, points[i], 'miles');
    if (distance < closestDistance) {
      closestDistance = distance;
    }
    if (distance < minDist) {
      return true;
    }
  }
  return false;
};


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
