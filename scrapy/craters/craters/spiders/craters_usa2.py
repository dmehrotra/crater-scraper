# -*- coding: utf-8 -*-
import scrapy
import csv
import re
import os

class CratersUsa2Spider(scrapy.Spider):
    name = 'craters_usa2'
    allowed_domains = ['johnstonsarchive.net']
    # start_urls = ['http://www.johnstonsarchive.net/nuclear/tests/USA-ntests2.html']
    start_urls = ['file:///C:/Users/kashi/Desktop/Craters/United_States_part_2,1964-1972.html']

    def parse(self, response):
        """ Main function that parses downloaded pages """
        # Print what the spider is doing
        print(response.url)
        # Get all the <pre> tags
        pre_selectors = response.xpath("//pre")
        # Loop on each tag
        for selector in pre_selectors:
            path = '.\\' + self.name
            # path = '..\..\..\..\scripts\node\data\\' + self.name
            # Extract the link text
            text = selector.xpath("text()").extract_first()
            f = open(path + '.txt', "w")
            f.write(text)
            f.close()

            with open(path + '.txt') as infile, open(path + '.csv', 'w') as outfile:
                for line in infile.read().splitlines(True)[8::2]:                   
                    line = re.sub(' S ', ' _ ', line)
                    line = re.sub(' SS ', ' __ ', line)
                    line = line[:7] + line[7:22].replace(' ', '_') + line[22:23] + line[23:44].replace(' ', '_') + line[44:]
                    line = ' '.join(line[:104:].split()).replace(" ", ',')
                    line = re.sub('\_\_+', '_', line)
                    outfile.write(line + ",\n")                   
            os.remove(path + '.txt')
