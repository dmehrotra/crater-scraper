# -*- coding: utf-8 -*-
import scrapy
import csv
import re
import os


class CratersPrcSpider(scrapy.Spider):
    name = 'craters_prc'
    allowed_domains = ['johnstonsarchive.net']
    # start_urls = ['http://www.johnstonsarchive.net/nuclear/tests/PRC-ntests1.html']
    start_urls = ['file:///C:/Users/kashi/Desktop/Craters/China-PRC_part_1,1964-1996.html']

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
                    if(line[7:22] == '               '):
                        line = line[:7] + line[48:52] + '           ' + line[22:]
                    if(line[23:47] == '                        '):
                        line = line[:23] + line[54:61] + '                 ' + line[47:]
                    if(line[64:75] == '           '):
                        line = line[:64] + "00:00:00.00" + line[75:]
                    line = line[:7] + line[7:22].replace(' ', '_') + line[22:23] + line[23:46].replace(' ', '_') + line[46:]
                    line = ' '.join(line[:106:].split()).replace(" ", ',')
                    line = re.sub('\_\_+', '_', line)
                    outfile.write(line + ",\n")                   
            os.remove(path + '.txt')
