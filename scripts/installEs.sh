#!/bin/bash
sudo apt-get update
sudo apt-get install openjdk-7-jre-headless -y
wget https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-1.6.0.tar.gz
tar -xf elasticsearch-1.6.0.tar.gz