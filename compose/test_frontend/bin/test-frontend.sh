#!/bin/bash
docker-compose -f docker-compose.test.frontend.yml exec -it frontend npm test -- --watchAll=false 

