## @todolist

- 1 Bug: LEAVE_RACE if server is reloaded (update socket id)
- 3 Bug: *game* when user type wrong char, not clear it and write right char, game continue. (check enters part of word)
- 4 Feature: global loader
- 5 Task: Add timer

## fixed in v0.1

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
- ~Move game logic to project~
- ~Add styles for RaceComponent~
- ~Feature: Show link to friend when race WAIT_PLAYERS~
- ~Task: create `playerRepository.getPlayer` method~
- ~Feature: Add music error when user make mistake~
- ~Feature: To update width of screen update step~
- ~Bug: save position to server as count of enter chars and parse it in frontend~
- ~Bug: set initial state to game by collection's doc data~
- ~Task: Text from SOURCE!~
- ~Bug: Hide text before start~
- ~Task: Add car images~
- ~Feature: Collect users stats~
- ~Feature: Select car into sign up~
- ~Task: Update players state~
- ~Feature: delete players from not started races if server is reload~
- ~Task: add constraint for cars count~
- ~Bug: check why delete players~
- ~Task: migrations for texts and add getRandomText static method~
- ~Feature: add mobile screen styles~
- ~Task: Add finish popup~
- ~Bug: move and crop images to server~
