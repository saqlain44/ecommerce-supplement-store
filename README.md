
# Ecommerce Supplement Store
[![CircleCI](https://circleci.com/gh/memoryInject/ecommerce-supplement-store/tree/main.svg?style=svg)](https://circleci.com/gh/memoryInject/ecommerce-supplement-store/tree/main)

Full-stack web application for ecommerce supplement store.


### Testing and CI/CD frameworks used:

 - Frontend: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) with [Mock Service Worker](https://mswjs.io/)
 - Backend: [Jest](https://jestjs.io/) with [SuperTest](https://github.com/visionmedia/supertest)
 - End-to-End: [Cypress](https://www.cypress.io/)
 - CI/CD: [CircleCI](https://circleci.com/) with [Heroku](https://www.heroku.com/)


## Demo

![Alt Text](https://res.cloudinary.com/memoryinject/image/upload/w_500,q_auto/v1640436341/nutri-strat-screenshot_nmmfh6.png)

https://nutri-strat.herokuapp.com/  👍  
More info: [memoryinject.io](https://memoryinject.io/) 

## Tech Stack

**Client:** React, Redux, Bootstrap

**Server:** NodeJS and Express 

**Database:** MongoDB 

**Payment Process:** PayPal
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Node environment   
`NODE_ENV=development`   

Express server port   
`PORT=5000`

MongoDB   
`MONGO_URI=mongodb://localhost/nutristrat_dev`

JSON web token secret   
`JWT_SECRET=your_jwt_secret`

PayPal Detail   
`PAYPAL_CLIENT_ID=your_paypal_dev_client_id`



[Cypress](https://www.cypress.io/dashboard) dashbord access   
`CYPRESS_KEY=''`

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

Install with npm for root and frontend:
```bash
  npm install && npm install --prefix frontend
```

Seed databse (Optional):
```bash
  npm run data:import
```

## Running Tests

Run the test with npm at the root:
```bash
  npm test
```
This will run both frontend react test and backend server test.

For End-to-End Cypress test, first run both frontend and backend dev server on test mode then open cypress.
```bash
  npm run dev-test
```

Open Cypress on another bash:
```bash
  npx cypress open
```

For Cypress CLI test ( make sure CYPRESS_KEY environent is set ):
```bash
  npx cypress run --record --key $CYPRESS_KEY
```


## Development


Seed database:
```bash
  npm run data:import
```


Run development servers (react and express) at root:
```bash
  npm run dev
```
By default react dev server running on port 3000 and express server running on port 5000.
## API Reference

[insomnia-api-spec.json](https://github.com/memoryInject/ecommerce-supplement-store/blob/main/insomnia-api-spc.json): for API testing with [Insomnia](https://insomnia.rest/)

All the API Reference are at: https://nutri-strat.herokuapp.com/api-docs/

## Deployment

This project build with CI/CD in mind, it's recommend to use a CI/CD platform to deployment.  
This project use [CircleCI](https://circleci.com/) with [Heroku](https://www.heroku.com/) for deployment.   
**Note: database hosted in [MongoDB atlas](https://www.mongodb.com/atlas/database)
## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.



## License

[MIT](https://choosealicense.com/licenses/mit/)


## Support

For support, email msmahesh@live.com.   
More info: [memoryinject.io](https://www.memoryinject.io/) 
