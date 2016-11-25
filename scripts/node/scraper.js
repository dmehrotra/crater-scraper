var GoogleMapsAPI = require('./node_modules/googlemaps/lib/index');
var fs = require('fs')
var google = new GoogleMapsAPI();
var cropper= require('easyimage')
var params = {
  zoom: 15,
  size: '500x400',
  maptype: 'satellite',
  center:"37.14228  -116.04911"
};


google.staticMap(params); // return static map URL
google.staticMap(params, function(err, binaryImage) {
  fs.writeFile('this.jpg', binaryImage, 'binary', function(err){
    if (err) throw err   
    cropper.rescrop({
         src:'this.jpg', dst:'./this.jpg',
         width:500, height:400,
         cropwidth:500, cropheight:350,
      }).then(
      function (err) {
        console.log(err);
      }
    );
  })
});
 