FROM ubuntu:20.04

RUN apt-get update
RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

COPY . /src

RUN cd src; npm install
RUN cd src; ls


EXPOSE 8099
CMD [ "node", "/src/app.js" ]
