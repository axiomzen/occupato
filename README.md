occupato
========

Bathroom as a Service (BaaS)

Our internal hackathon project to monitor whether our bathrooms are full.

npm install to install dependencies.

./bin/www to run

To simulate the bathroom monitor arduino:

Send a GET request to `localhost:3777/send/update?id=1&open=1` 

id can be 1,2, or 3 and open can be 0 or 1

`localhost:3777/status` to see the status page
