FROM node:12

WORKDIR /usr/src/server

COPY package.json ./

COPY tsconfig.json ./

RUN npm config set package-lock false

RUN npm install

COPY ./src ./src

EXPOSE 4223

CMD [ "npm", "run", "dev" ]
