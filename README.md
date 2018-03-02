# eml-reader
:email: EML reader - render content of email source

## Requirements
- nodejs version >= 4
- npm

## Install and run
- `npm install`

#### Development
- `npm start` - will build frontend and run server
- open [localhost:3000](http://localhost:3000)

#### Production
- `npm run build` - build frontend
- run `app.js` file with your favourite process management tool
```sh
# Example
npm i
npm run build
PORT="XXXX" pm2 start app.js
```