FROM node:18
WORKDIR /app
COPY . .
RUN npm ci && npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"]
EXPOSE 3000
