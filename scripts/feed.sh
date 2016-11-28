#!/bin/bash
FILES=./images/*
for f in $FILES
do
	python hog.py $f
done