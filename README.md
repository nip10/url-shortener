# url-shortener

[![Build Status](https://travis-ci.org/nip10/url-shortener.svg?branch=master)](https://travis-ci.org/nip10/url-shortener)
[![codecov](https://codecov.io/gh/nip10/url-shortener/branch/master/graph/badge.svg)](https://codecov.io/gh/nip10/url-shortener)

Simple url-shortener with social sharing features. Built with Node, React and MongoDB.

[Live demo](https://sh.diogocardoso.dev)

TODO: Record generating a shortened url and show it here.

## Getting Started

Make sure you have all the prerequisites checked, clone the repo and follow the development/deploy instructions.

### Prerequisites

```
NodeJS v10
MongoDB
Yarn (or npm)
```

### Installing

After cloning the repo, run

```
yarn
```

in both client and server folders.

## Running the tests

At this moment, only the server has tests. To run the tests, run

```
yarn test
```

For the coverage report, run

```
yarn test:coverage
```

## Development

### Client

Run

```
yarn start
```

to start a development server with hot-reloading.

### Server

Edit and rename .env.sample to .env

Run

```
yarn watch
```

to start the server with hot-reloading (using Nodemon)

## Deployment

### Client

Edit package.json's "homepage" property to refer to the url you are deploying to.

Build, by running

```
yarn build
```

Note: The Travis file included in the repo will deploy the client to an S3 bucket. If you are using S3, you can simply change the keys and "run" it.

### Server

Edit and rename .env.sample to .env

Build, by running

```
yarn build
```

After deploying it to your server, start the server by running:

```
yarn start
```

## Built With

- Typescript
- NodeJS
- MongoDB
- Express
- React

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknoledgment

The function that generates the short url was taken from [here](https://github.com/delight-im/ShortURL/blob/master/JavaScript/ShortURL.js).
