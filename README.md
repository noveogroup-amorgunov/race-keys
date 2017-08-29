# Race keys game

## todolist

- ~Move players and race store to mongoo from redis (In redis store only socketId -> userId)~
- ~Rename room to race entiry in server~
- ~Refactoring server actions, which send to client by socket.io~
- Add component for preview race RacePreviewComponent
- Add component for race page
- Add component for create new race
- Refactoring main (move logic to app) reducer and write game ducks
- Add styles (try bulma-react)
- Add car images
- Fix: load race (if races is not loaded) and set currentRace
- Fix: load game state with races (?) new action

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

## Usage

Run application with follow command (run api and socket servers):


```bash
$ cd backend
$ npm start

$ cd frontend
$ npm start
```
