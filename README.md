# Vybe Full-Stack Code Challenge

## Getting Started

1.  [API keys](#api-keys)
1.  [Docker Compose](#docker-compose)
1.  [Manual Install](#manual-install)

### API Keys

This project requires two API keys

| URL                              | Description                      |
| -------------------------------- | -------------------------------- |
| https://extrnode.com/            | API key for public RPC node      |
| https://www.coingecko.com/en/api | CoinGecko API key for price data |

### Docker Compose

1.  Clone project
2.  CD into `docker` directory
3.  Run `build_images.sh` script to build docker images.
    - Note the server Dockerfile expects the docker context to be the root directory of the project. If you don't want to use the build script you will need to adjust your context accordingly.
4.  In the `docker` directory, create a `.env` file, add the following environmental variables:

| Name               | Description                      | Required | Value     |
| ------------------ | -------------------------------- | -------- | --------- |
| PORT               | Server port                      | Optional | `3000`    |
| REDIS_PORT         | Redis port                       | Optional | `6379`    |
| REDIS_HOST         | Redis host                       | Required | `redis`   |
| API_KEY            | https://app.extrnode.com API key | Required | <api_key> |
| COIN_GECKO_API_KEY | Coin Gecko API key               | Required | <api_key> |

**NOTE** If you don't use the default ports please update docker images and `docker-compose.yaml` to reflect desired ports

5.  Run `docker compose up`
6.  Visit `http://localhost:5173`

### Manual install

1.  Clone project
2.  CD into the `docker` directory and build the Redis image
    - `docker build -f ./redis.Dockerfile -t vybe_redis .`
3.  Run the Redis image:
    - `docker run -d -p 6379:6379 -v $(pwd)/redis/data:/data --name vybe_redis vybe_redis`
4.  CD into `server` directory
5.  Create a `.env` file with the following environmental variables:

| Name               | Description                      | Required | Value       |
| ------------------ | -------------------------------- | -------- | ----------- |
| PORT               | Server port                      | Optional | `3000`      |
| REDIS_PORT         | Redis port                       | Optional | `6379`      |
| REDIS_HOST         | Redis host                       | Optional | `127.0.0.1` |
| API_KEY            | https://app.extrnode.com API key | Required | <api_key>   |
| COIN_GECKO_API_KEY | Coin Gecko API key               | Required | <api_key>   |

6.  Start the dev server `npm run dev`
7.  Optionally, CD into the `client` directory and create a `.env` file with the following environmental vars:

| Name              | Description | Required | Value                          |
| ----------------- | ----------- | -------- | ------------------------------ |
| VITE_API_BASE_URL | Base URL    | Optional | `http://localhost:3000/api/v1` |

**NOTE** If you don't use the default port for the server, please update your env var to reflect.

8.  Run `npm run dev` to start dev server
9.  Visit `http://localhost:5173`
