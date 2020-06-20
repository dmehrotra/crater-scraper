# Crater-Scraper / Crater Classification

Identifying Craters left from nuclear weapons testing using a Convolutional Neural
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

1. Install scrapy, dlib, scikit-image, tensorflow and tensorflow_hub.

2. Install the node prerequisites and create a directory to hold images:
    ```
    cd scripts/node
    npm install googlemaps easyimage imagemagick gm underscore fast-csv turf @turf/invariant @turf/turf
    mkdir -p ../../images/crater ../../images/no_crater
    ```

3. Run all 10 Scrapy spiders. They will output .csv files in node/data containing info about nuclear test sites.
    ```
    cd scrapy\craters\craters\spiders\
    scrapy crawl craters_usa1
    scrapy crawl craters_usa2
    scrapy crawl craters_usa3
    scrapy crawl craters_ussr1
    scrapy crawl craters_ussr2
    scrapy crawl craters_ussr3
    scrapy crawl craters_uk
    scrapy crawl craters_fr
    scrapy crawl craters_prc
    scrapy crawl craters_ipnku
    ```

4. Generate a Google Static Maps API key by going to the
   [Google Static Maps API page](https://developers.google.com/maps/documentation/static-maps/) and
   clicking the "GET KEY" button. Put the key in
   `scripts/node/config.js`.

5. Run scraper.js to gather nuclear test site images from known coordinates:
    ```
    node scraper.js
    ```

    This should take about 10 minutes to collect approximately 2400 images.

6. Run random_scraper.js to gather satellite imagery of random places that are between 5 and 20 miles away:
    ```
    node random_scraper.js
    ```

7. Install GraphicsMagick prerequisites and convert the PNG images to JPG using gm:
    ```
    cd images/crater
    find . -type f -print0 | xargs -0 -n 1 -P 6 -I {} sh -c "gm convert {} -quality 99 {}.jpg && rm {}"
    cd ../images/no_crater
    find . -type f -print0 | xargs -0 -n 1 -P 6 -I {} sh -c "gm convert {} -quality 99 {}.jpg && rm {}"
    ```

8. Train the model:
    ```    
    python retrain.py --how_many_training_steps 4000 --output_graph=crater_graph.pb --output_labels=crater_labels.txt --image_dir=..\..\..\images
    ```

9. Run the classifier on a new image:
    ```
    python label_image.py --graph=crater_graph.pb --labels=crater_labels.txt --output_layer=final_result --image=..\..\..\2.jpeg --input_layer=module_apply_default/hub_input/Mul
    ```

    OUTPUT:
    ```
    2019-06-15 15:58:38.495479: crater 0.996566
    2019-06-15 15:58:38.495497: no crater 0.0034340592
    ```

-----------------------------------

* Scrapy scraper that returns .csv files of craters info.
* Compiled CSVs of nuclear tests and coordinates.
* Script to collect a Google Maps static image of crater site and save as a cropped image.
* Script to convert crater images into Histogram of Oriented Gradients.
* Gathered all images... around 2400.
* Convolution with Tensorflow.
* Neural Network with Tensorflow.
* retrain.py to train the final layer of a pretrained inception model.
* Classifying images.

## Current status

This works to identify craters with better than average results.
However, it is easy to fool if you feed an image of a desert to the
network. Still is valuable code if all you want to do is scrape all
2400 images.

Thanks to Johnston Archives.

http://www.johnstonsarchive.net/nuclear/tests/
