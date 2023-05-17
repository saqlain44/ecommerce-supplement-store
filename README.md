
# Ecommerce Supplement Store
[![Docker Image CI](https://github.com/memoryInject/ecommerce-supplement-store/actions/workflows/docker-image.yml/badge.svg)](https://github.com/memoryInject/ecommerce-supplement-store/actions/workflows/docker-image.yml)

Full-stack web application for ecommerce supplement store.


## Tech Stack

**Frontend:** React, Redux Toolkit, Bootstrap, TypeScript   
**Backend:** Node, Express, MongoDB 

**Frontend Test:** Vitest with MSW https://mswjs.io/   
**Backend Test:** Jest with Supertest 

**Linter:** ESLint   
**Formatter:** Prettier

**CI:** Github Actions

**Payment Process:** PayPal

## File structure
```bash
.
├── LICENSE
├── api-docs
├── insomnia-api-spc.json
├── jest.config.js
├── backend
├── compose
├── docker-compose.test.backend.yml
├── docker-compose.test.frontend.yml
├── docker-compose.test.yml
├── docker-compose.yml
├── frontend
├── package-lock.json
├── package.json
├── watchdog.sh
└── README.md

```


## Demo

![Alt Text](https://res.cloudinary.com/memoryinject/image/upload/w_500,q_auto/v1640436341/nutri-strat-screenshot_nmmfh6.png)

More info: [memoryinject.io](https://memoryinject.io/) 

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Node environment   
`NODE_ENV=development`   

Express server port   
`PORT=8000`

MongoDB   
`MONGO_URI=mongodb://localhost/nutristrat_dev`

JSON web token secret   
`JWT_SECRET=your_jwt_secret`

PayPal Detail   
`PAYPAL_CLIENT_ID=your_paypal_dev_client_id`


For test only change database name but it's already done in npm script with cross-env, no need to set it on your .env   
`MONGO_URI=mongodb://localhost/nutristrat_test`


## Installation

It is a mono repo for both frontend and backend.
Frontend is build with react, backend is build with NodeJS and Express.   

Clone this project to local drive:  
```bash 
  git clone https://github.com/memoryInject/ecommerce-supplement-store.git
  
  cd ecommerce-supplement-store
```


Install with npm for root:
```bash
  npm install 
```

Install deps for frontend:
```bash
  cd frontend
  npm install --legacy-peer-deps
```

**(No need to install these if running under Docker)**

Seed databse (Optional):
```bash
  npm run data:import
```

### Development

There are two ways to run this project   
 - Run locally 
 - Run with docker

### Run Locally (without Docker, if running docker skip this part)

Seed database:
```bash
  npm run data:import
```

Run development servers (react and express) at root:
```bash
  npm run dev
```
By default react dev server running on port 3000 and express server running on port 8000.

### Run with Docker (Recommended option)

If running under docker follow the steps below:  

Open a new terminal at the root of the project and run the command (Make sure docker is running and run this command at the root).
```bash
  ./compose/local/bin/up-build.sh
```
For windows run this command instead of the command above, also make sure that run this command at root directory:
```bash
  docker-compose up --build
```
After successfully build and up the docker, got to http://localhost:3000 to see the project in a browser.  

There are lots of commands available in `./compose/local/bin/` for checking logs, shell to the container etc.  

## Running Tests
There are two ways to run the test  
 - Run locally
 - Run with docker

### Run test locally
Run the test with npm at the root:
```bash
  npm test
```
This will run both frontend react test and backend server test.

### Run test with Docker

To run tests, make sure the current working directory is the root of this project then run this command    

Frontend test:
```bash
  ./compose/test_frontend/bin/up-build.sh
```

Backend test:
```bash
  ./compose/test_backend/bin/up-build.sh
```

## API Reference

[insomnia-api-spec.json](https://github.com/memoryInject/ecommerce-supplement-store/blob/main/insomnia-api-spc.json): for API testing with [Insomnia](https://insomnia.rest/)

All the API Reference are at: http://localhost:8000/api-docs

## Deployment

This project build with CI/CD in mind, it's recommend to use a CI/CD platform to deployment.  
**Note: database hosted in [MongoDB atlas](https://www.mongodb.com/atlas/database)
## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.



## License

[MIT](https://choosealicense.com/licenses/mit/)


## Support

For support, email msmahesh@live.com.   
More info: [memoryinject.io](https://www.memoryinject.io/) 
