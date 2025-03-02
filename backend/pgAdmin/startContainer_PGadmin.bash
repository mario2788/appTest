#!/bin/bash



sudo docker run -d \
  --name pgadmin4 \
  --restart always \
  --network host \
  -e PGADMIN_DEFAULT_EMAIL=maacuellarma@gmail.com \
  -e PGADMIN_DEFAULT_PASSWORD=pgadmin \
  -e PGADMIN_LISTEN_PORT=8080 \
  -v $(pwd)/servers.json:/pgadmin4/servers.json \
  elestio/pgadmin:REL-8_12



# http://localhost:8080

# PGADMIN_USER for user name (default value is admin@pgadmin.org)
# PGADMIN_PASSWORD for password (default value is pgadmin)