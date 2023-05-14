#!/bin/bash
docker-compose -f docker-compose.test.backend.yml up --build --abort-on-container-exit
