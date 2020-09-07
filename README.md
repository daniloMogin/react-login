# ESKO Login, Register and Configuration

## Prerequisites (Node.js)

-   Created and tested on Node.js 14.7.0

## To start a simple server

### server have two routes /login and /register

1. Open server folder in root
2. Run CMD and run "npm i" to install all necessary packages
3. In CMD type "npm run start-auth" - to start the server

## To start React app

### React app have login, logout, register and configuration routes

1. In root folder run "npm i" to install all necessary packages
2. In CMD type "npm run dev" - to start React app
3. Open browser
4. Go to http://localhost:1234
5. To Login in use **email:** "esko@domain.com" **pass:** "test" or
6. Register new user

### Build dev Docker image from PowerShell
1. Build docker image - docker build -t sample:dev .
2. Start docker container - docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3000:1234 -e CHOKIDAR_USEPOLLING=true sample:dev

### Build dev Docker image with docker compose
1. Build image and run docker - docker-compose up -d --build
2. Stop docker - docker-compose stop

### Build production Docker image using
1. Build docker image - docker build -f Dockerfile.prod -t sample:prod .
2. Start Docker container - docker run -it --rm -p 1337:80 sample:prod

### Build production Docker image with docker compose
1. docker-compose -f docker-compose.prod.yml up -d --build