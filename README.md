# Crater-Scraper / Crater Classification

Identifying Craters left from wepons test using Convolutional Neural
Network.

Crater Scraping is an ongoing research project that seeks to train a
Convolutional Neural Network to identify and classify nuclear weapons
test sites. Crater Scraping works by utilizing information from FOIA
requests and research from military historians to scrape satellite
imagery of weapons test sites. Images are then used to train a Neural
Network to identify and classify man made geological events from
satellite imagery.

![Alt text](./1.jpeg "")
![Alt text](./2.jpeg "")
![Alt text](./4.jpeg "")
![Alt text](./3.jpeg "")
![Alt text](./5.jpeg "")


-----------------------------------

Installation:

1. Install dlib, scikit-image and tensorflow.

2. Install the node prerequisites and create a directory to hold
   images:
```
cd scripts/node
npm install googlemaps easyimage fast-csv
mkdir -p ../../images/crater ../../images/no_crater
```

3. Generate a Google Static Maps API key by going to
   the
   [Google Static Maps API page](https://developers.google.com/maps/documentation/static-maps/) and
   clicking the "GET KEY" button. Put the key in
   `scripts/node/config.js`.

3. Run scraper.js to gather nuclear test site images:
```
node scraper.js
```

This should take about 10 minutes to collect approximately 2000
images.

4. Run random_scraper.js to gather satellite imagery of random places.
5. Train the model:
```
python tensorflow/tensorflow/examples/image_retraining/retrain.py \
--bottleneck_dir=./tf_files/bottlenecks \
--how_many_training_steps 500 \
--model_dir=./tf_files/crater_inception \
--output_graph=./tf_files/retrained_graph.pb \
--output_labels=./tf_files/retrained_labels.txt \
--image_dir=./tf_files/test_sites
``

5. run tf-classifier

-----------------------------------

* 11/23 - Script to collect a google map of crater site and save as cropped image.
* 11/24 - Script to convert crater images into Histogram of Oriented Gradients.
* 11/25 - Compiled CSVs of nuclear tests and coordinates
* 11/26 - Gathered all images...around 2000
* 12/3 - Convolution with Tensorflow
* 12/5 - Neural Net with tensor flow
* 12/7 - retrain.py to train the final layer of a pretrained inception model
* 12/9 - classifying images

## Current status

This works to identify craters with better than average results.
However, it is easy to fool if you feed an image of a desert to the
network. Still is valuable code if all you want to do is scrape all
2000 images.

Thanks to johnston archives.

http://www.johnstonsarchive.net/nuclear/tests/
