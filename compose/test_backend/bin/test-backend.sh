#!/bin/bash
docker-compose -f docker-compose.test.backend.yml exec -it backend npm run test-backend
