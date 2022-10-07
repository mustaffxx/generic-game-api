# generic-game-api
Generic Game API is an backend to be used in MUD games hosted in Discord.
Discord BOT will act as middleware between USER and Generic Game API, providing user decoupling and authentication.

### BUILD and RUN
Get the project ready to build:
```console
$ git clone https://github.com/mustaffxx/generic-game-api
$ cd generic-game-api
$ cp .env.example .env
```
Build and run the containers:
```console
$ docker compose up -d
```
Server is running on http://localhost:3030

### Usage
* Make requests in the endpoints

### API Endpoints
#### Player
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/game/player | To create a new player |
| GET | /api/game/player/:username | To retrieve details of a single player |
| PATCH | /api/game/player/:username | To edit the details of a single player |
| DELETE | /api/game/player/:username | To delete a single player |
| GET | /api/game/player/battle/:username | To realize a battle |

#### Mobs
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/game/mob | To create a new mob |
| GET | /api/game/mob/:name | To retrieve details of a single mob |
| PATCH | /api/game/mob/:name | To edit the details of a single mob |
| DELETE | /api/game/mob/:name | To delete a single mob |

### test
To test all endpoints:
```console
$ yarn jest
```