# Crater-Scraper / Crater Classification
Identifying Craters left from wepons test using Convolutional Neural Network.

This repository is a machine learning exploration into trying to identify bomb craters. 
http://www.johnstonsarchive.net/nuclear/tests/


The first step is to scrape known latitude and logitudes of weapons test sites to compile photographs of weapons tests. The second step is to create Histogram of Oriented Gradients of each crater image. 

-----------------------------------
Installation:

You need dlib and scikit-image.

-----------------------------------
11/23 - Script to collect a google map of crater site and save as cropped image. 
11/24 - Script to convert crater images into Histogram of Oriented Gradients.
11/25 - Compiled CSVs of nuclear tests and coordinates
11/26 - Gathered all images...around 2000
