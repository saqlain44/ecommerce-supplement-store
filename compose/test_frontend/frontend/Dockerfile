FROM node:19-alpine

WORKDIR 'usr/src/app'

COPY ./frontend/package.json ./
RUN npm install --legacy-peer-deps
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY ./compose/test_frontend/frontend/start.sh /start.sh 
RUN sed -i 's/\r$//g' /start.sh
RUN chmod +x /start.sh
