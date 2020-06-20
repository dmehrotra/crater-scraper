# -*- coding: utf-8 -*-
import scrapy
import csv
import re
import os


class CratersIpnkuSpider(scrapy.Spider):
    name = 'craters_ipnku'
    allowed_domains = ['johnstonsarchive.net']
    # start_urls = ['http://www.johnstonsarchive.net/nuclear/tests/OTH-ntests1.html']
    start_urls = ['file:///C:/Users/kashi/Desktop/Craters/India_Pakistan_North-Korea_Unknown,1974-2009.html']

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
                for line in infile.read().splitlines(True)[12:]:
                    if(len(line) > 50):                      
                        if(line[7:22] == '               '):
                            line = line[:7] + line[1:5] + '           ' + line[22:]
                        if(line[23:46] == '                       '):
                            line = line[:23] + line[48:52] + '                    ' + line[47:]
                        if(line[78:81] == '   '):
                            line = line[:78] + '???' + line[81:]
                        line = line[:7] + line[7:22].replace(' ', '_') + line[22:23] + line[23:45].replace(' ', '_') + line[45:]
                        line = ' '.join(line[:106:].split()).replace(" ", ',')
                        line = re.sub('\_\_+', '_', line)
                        outfile.write(line + ",\n") 
            os.remove(path + '.txt')
