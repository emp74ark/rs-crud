# CRUD API

[Task link](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

## Description
Simple CRUD API using in-memory database underneath.

## Instructions

### Set environment

```bash
git clone https://github.com/emp74ark/nodejs-crud
cd rs-crud
git checkout dev
npm install
```
Rename **.env.example** file to **.env**.

### Run application
Development mode:
```bash
npm run start:dev
```

Production mode:
```bash
npm run start:prod
```

Single-mode:
```bash
npm run start:single
```

Multi-mode:
```bash
npm run start:multi
```

### Tests
Run server before tests:
``` bash
npm run start:single
```
then:
```bash
npm run test
