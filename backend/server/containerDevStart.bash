#!/bin/bash

sudo docker run -it --rm --name server_app_huevos \
    -v ./:/servidor -w /servidor  --network host \
    node:22-alpine3.19 /bin/ash
