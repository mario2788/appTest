#!/bin/bash

sudo docker run -it --rm --name app-huevos \
	-v $(pwd)/:/app -w /app/app-huevos --network host \
	node:22-alpine3.19 /bin/ash
