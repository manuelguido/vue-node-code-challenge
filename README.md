
# Vue Node Coding Challenge - Developed by Manuel Guido

## Download project

To download the project open your terminal and run

```bash
  git clone https://github.com/manuelguido/vue-node-code-challenge.git
```

## Setup project

Cd into the project folder

```bash
cd vue-laravel-code-challenge
```

Cd into client folder

```bash
cd client
```

Install NPM dependencies for client app

```bash
npm install
```

Cd back into vue-laravel-code-challenge folder

```bash
cd ..
```

Cd into server folder

```bash
cd server
```

Install NPM dependencies for server app

```bash
npm install
```

Create a new mysql database. Then open "knexfile.js" and add your database information in order to configure your project database.
Replace the following data with yours

```bash
connection: {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vue-node-challenge',
}
```

Then do the same into "config/db.js" file

```bash
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vue-node-challenge'
});
```

Now run project migrations with the following command

```bash
npx knex migrate:latest
```

## Run project

### IMPORTANT: In order to run the whole project, open 2 terminal tabs.

On the first tab, cd intro the the client app of the project

```bash
cd vue-node-code-challenge/client
```

And then run this command

```bash
npm run dev
```

On the second tab tab, cd intro the the client app of the project

```bash
cd vue-node-code-challenge/server
```

And then run this command

```bash
npm run start
```

Now you can test the project at http://localhost:8000/
