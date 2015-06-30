#!/bin/bash

#run PG if installed through brew (ignore if installed through npm install) 
#pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start &

#run ES if installed through source (npm install)
./elasticsearch-1.6.0/bin/elasticsearch &

#run ES if installed via brew (ignore if installed via installEs.sh)
#elasticsearch --config=/usr/local/opt/elasticsearch/config/elasticsearch.yml &