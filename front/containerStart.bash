


#!/bin/bash


sudo docker run -it --rm --name app-huevos \
	-v $(pwd)/:/app -w /app/app-huevos --network host \
	node:20-alpine3.17 /bin/ash
