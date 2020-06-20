FROM node:12-alpine

WORKDIR /usr/src/server

COPY package.json ./

COPY tsconfig.json ./

RUN npm config set package-lock false

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# RUN npm install pm2 -g

# ADD ./src /usr/src/server/src

# RUN npm run build

# To deploy
# COPY ./dist .
COPY ./src ./src

EXPOSE 4223

#CMD ["pm2-runtime","app.js"]
CMD [ "npm", "run", "dev" ]
