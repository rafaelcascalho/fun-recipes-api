<h1 align="center"> Fun Recipes API </h1>

<p align="center"> This API is the implementation of the delivery-much test. </a></p>

### Prerequisites

#### :warning: Required :warning:

Docker and docker-compose

```
$ docker -v
Docker version 19.03.8, build afacb8b7f0

$ docker-compose -v
docker-compose version 1.25.4, build 8d51620a
```

## :rocket: Getting started :rocket:

### Setup and run :woman_running:

Clone the repository and enter the repository directory

```
$ git clone git@github.com:rafaelcascalho/fun-recipes-api.git

$ cd fun-recipes-api/
```

After that's done, you can just check if your `development` environment is running using the command

```
$ ./run.sh

or 

$ sh run.sh
```

That's it! You're all set. :clinking_beer_mugs:

## :test_tube: Running the tests :test_tube:

To run the tests just use the command

```
$ npm test
```

To check the coverage files use the command

```
$ npm run cov:serve
```

## Built With

- [NodeJs](https://nodejs.org/) - Backend environment for javascript
- [Typescript](https://www.typescriptlang.org/) - Typescript as a superset for the node environment
- [Ts-node-dev](https://www.npmjs.com/package/ts-node-dev) - To restart the node process on file changes
- [Express](https://expressjs.com/) - Express as the http requests handler
- [NodeJs](https://nodejs.org/) - Backend environment for javascript
- [Jest](https://jestjs.io/) - Automated tests library
- [Prettier](https://prettier.io/) - Code formatter
- [Editorconfig](https://editorconfig.org/) - Code style enforcer
- [Dotenv](https://www.npmjs.com/package/dotenv) - Env files loader
- [Eslint](https://eslint.org/) - Code linting tool
- [Docker](https://www.docker.com/) - Virtualizer of containers
- [Docker Compose](https://docs.docker.com/compose/) - Containers manager
