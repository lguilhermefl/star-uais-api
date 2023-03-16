# Star Uais API

Front-end for the [Star Uais](https://github.com/lguilhermefl/star-uais-front) project

## Getting started

First, clone the repository and install the dependencies.

```bash
git clone git@github.com:lguilhermefl/star-uais-api.git
cd star-uais-api
npm install
```
This API uses MongoDB as a database and JWT for auth security. You'll need to create a `.env` with the following variables:

```bash
DATABASE_URL=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
PORT=
```

You'll also need to generate and create the database. Prisma ORM is being used to manage it. Run:

```bash
npx prisma generate
npx prisma db push
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

[MIT licensed](LICENSE).
