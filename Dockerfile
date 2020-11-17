FROM ubuntu:20.04
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

EXPOSE 8099
CMD [ "node", "app.js" ]
