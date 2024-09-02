<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# NestJS Project with PostgreSQL and JWT Authentication

## Overview

This project is a NestJS application using PostgreSQL as the database with JWT authentication. It includes endpoints for user operations such as creation, retrieval, updating, and deletion.

## Used Technologies and Tools

- **NestJS:** A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeScript:** A superset of JavaScript that adds static types and other features to the language.
- **PostgreSQL:** An open-source relational database management system.
- **TypeORM:** An ORM for TypeScript and JavaScript that supports various SQL databases including PostgreSQL.
- **JWT (JSON Web Tokens):** A compact, URL-safe means of representing claims to be transferred between two parties.
- **class-validator:** A library for validating objects based on decorators and validation rules.
- **class-transformer:** A library for transforming and serializing objects based on class definitions.
- **dotenv:** A module for loading environment variables from a `.env` file into `process.env`.



## Directory Structure

``` bash
src/
├── app.module.ts          # Root module of the application
├── app.controller.ts      # Root controller of the application
├── app.service.ts         # Root service of the application
├── user/
│   ├── user.module.ts     # Module for user operations
│   ├── user.controller.ts # Controller for handling API requests
│   |── user.service.ts    # Service for user operations and JWT | handling
|   |── dto/
│   |    ├── create-user.dto.ts # DTO for creating a new user
│   |    ├── updateuser.dto.ts  # DTO for updating a user
│   |    └── deleteuser.dto.ts  # DTO for deleting a user
|   |── entity/
│         └── user.entity.ts     # TypeORM entity for user
└── main.ts                # Entry point of the application

```

## Environment Variables

Create a `.env` file in the root directory with the following variables:


```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=2005@Sudharsan
DB_NAME=sudharsan

```
Replace the placeholder values with your actual database credentials.


API Endpoints User Operations 
<br>
<br>

# Create User

- **URL** : /api
- **Method** : POST

```
Body

json

{
  "name": "string",
  "email": "string",
  "password": "string",
  "place": "string"
}
```
<br>
<br>

# Login

- **URL**: /api/login
- **Method**: POST
``` 
Body

json

{
  "email": "string",
  "password": "string"
}
```
<br>
<br>

# Find All Users

- **URL** : /api
- **Method**: GET
- **Find User by ID**


```
URL: /api/:id
Method: GET
Path Parameter:
id - User ID (number)
```
<br>
<br>

# Update User

- **URL**: /api
- **Method**: PUT
```
Body

json

{
  "name": "string",
  "place": "string",
  "authentication": "Bearer [token]"
}
```


**Data Requirements**  :
authentication: A Bearer token for authentication.

- name: New name (optional).
- place: New place (optional).

<br>
<br>

# Delete User

- **URL**: /api
- **Method**: DELETE
``` 
Body:

json
{
  "email": "string",
  "password": "string",
  "confirmation": "string",
  "authentication": "Bearer [token]"
}
```
**Data Requirements**:
- **Authentication**: A Bearer token for authentication.
- **email**: Email of the user to delete.
- **password**: Password for verification.
- **confirmation**: Should be "confirm" to proceed with the deletion.

<br>
<br>

# Requirements
- **Node.js**: Ensure you have Node.js installed.
- **PostgreSQL**: Make sure PostgreSQL is set up and running.
- **TypeORM**: The project uses TypeORM to interact with the PostgreSQL database.
- **JWT**: JSON Web Tokens for authentication.
Running the Application
Install dependencies:

``` bash
npm install
```
<br>
<br>

# Start the application:

``` bash
npm run start
```
The server will run on http://localhost:3000 by default.