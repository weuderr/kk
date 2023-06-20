
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# kuantokusta

## Requirements

- [Node.js](https://nodejs.org/en/) >= 14.0.0
- [NestJS](https://nestjs.com/) >= 11.0.0
- [Docker](https://www.docker.com/) >= 19.03.8
- [Docker Compose](https://docs.docker.com/compose/) >= 1.25.5


## How to run the project

### 1. Clone this repository

### 2. Install dependencies

#### 2.1. Install dependencies for the API

```bash
cd kuantokusta-api && npm install 
```

#### 2.2. Install dependencies for the Cart

```bash
cd kuantokusta-cart && npm install 
```

#### 2.3. Install dependencies for the Product

```bash
cd kuantokusta-product && npm install 
```

#### or in Linux

```bash
make install-node-modules-all
```

## Alert - Docker

This project uses docker to run the database. If you don't have docker installed, please install it before running the project.

## Running the database

```bash
# in project of cart
$ docker-compose up -d
# in project of Product
$ docker-compose up -d
```

## Run the project

#### 3.1. Run the API

```bash
cd kuantokusta-api && npm start 
```

#### 3.2. Run the Cart

```bash
cd kuantokusta-cart && npm start 
```

#### 3.3. Run the Product

```bash
cd kuantokusta-product && npm start 
```

#### or in Linux

```bash
make run-all
```

### 4. Open [http://localhost:3000](http://localhost:3000) to view API in the browser.
