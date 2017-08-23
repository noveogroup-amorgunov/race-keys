# Race keys game

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

$ cd frontend
$ cp .env.defaults .env
$ npm install
```

## Usage

Run application with follow command (run api and socket servers):


```bash
$ cd backend
$ npm start

$ cd frontend
$ npm start
```