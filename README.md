# Race keys simulator

![](https://github.com/noveogroup-amorgunov/race-keys/raw/master/frontend/src/assets/images/preview.gif)

## Requirements

- Redis ([How install in Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-redis-on-ubuntu-16-04))
- Mongodb ([How install in Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04))
- Node (*version: >8.0*)

## Installation

Create `.env` file (example in `.env.defaults`) and install dependencies for frontend and backend parts:

```bash
$ cd backend
$ cp .env.defaults .env
$ npm install
$ npm run migrate

$ cd frontend
$ cp .env.defaults .env
$ npm install
```

or just run `$ bash install.sh`.

## Usage

Run application with follow command (run api and socket servers):


```bash
$ cd backend
$ npm start # run api server

$ cd frontend
$ npm start # run webpack-dev-server
```
