# seatgeekChallenge

docker build --tag sgchallenge .
docker run  --detach -p 8099:8099 sgchallenge:latest

npm run app.js
npm run test
