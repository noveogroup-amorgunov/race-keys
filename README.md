# Race keys game

## @todolist

- ~Move players and race store to mongoo from redis (In redis store only socketId -> userId)~
- ~Rename room to race entiry in server~
- ~Refactoring server actions, which send to client by socket.io~
- ~Add component for preview race RacePreviewComponent~
- ~Add component for race page~
- ~Add component for create new race~
- ~Add styles (try bulma-react)~
- ~Bug: load race (if races is not loaded) and set currentRace~
- ~Bug: load game state with races (?) new action (NOT NEEDED)~
- ~Refactoring main (move logic to app) reducer and~ write game ducks
- ~Show authorized user IN_PROCESS races in main page~
- ~Bug: add socket token after login / remove token after logout~
- ~Bug: after create new race, click to "ready" and leave race, user can't "ready" to new race.. *was few players on one user, so find player by race*~
- Add car images
- Move game logic to project
- Collect uesrs stats
- Add styles for RaceComponent
- Bug: LEAVE_RACE if server is reloaded (uodate socket id)
- Feature: select car into sign up
- Feature: Show link to friend when race WAIT_PLAYERS


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
