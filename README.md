# Crater-Scraper / Crater Classification
Identifying Craters left from wepons test using Convolutional Neural Network.

Crater Scraping is an ongoing research project that seeks to train a Convolutional Neural Network to identify and classify nuclear weapons test sites. Crater Scraping works by utilizing information from FOIA requests and research from military historians to scrape satellite imagery of weapons test sites. Images are then used to train a Neural Network to identify and classify man made geological events from satellite imagery. 

Thanks to johnston archives.

http://www.johnstonsarchive.net/nuclear/tests/

The first step is to scrape known latitude and logitudes of weapons test sites to compile photographs of weapons tests. The second step is to create Histogram of Oriented Gradients of each crater image. 


![Alt text](./1.jpeg "")
![Alt text](./2.jpeg "")

-----------------------------------
Installation:

1. You need dlib and scikit-image.
2. Run node scraper.js to gather nuclear test site images
3. Run random_scraper.js to gather satellite imagery of random places
4. Run python tensorflow/tensorflow/examples/image_retraining/retrain.py \
—bottleneck_dir=./tf_files/bottlenecks \
—how_many_training_steps 500 \
—model_dir=./tf_files/crater_inception \
—output_graph=./tf_files/retrained_graph.pb \
—output_labels=./tf_files/retrained_labels.txt \
—image_dir=./tf_files/test_sites

5. run tf-classifier 

-----------------------------------

11/23 - Script to collect a google map of crater site and save as cropped image. 
11/24 - Script to convert crater images into Histogram of Oriented Gradients.
11/25 - Compiled CSVs of nuclear tests and coordinates
11/26 - Gathered all images...around 2000
