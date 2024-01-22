# Thumbmark Storage backend

This an example backend for the Thumbmark Storage. It is implemented using the Serverless framework, written in Typescript.

It's a simple lambda function with a dynamodb table. Read more about this project from the top level readme file.

## Installation steps

To initialize, clone the

```
npm install
```

To run things locally, you can do this:


```
serverless dynamodb install
serverless offline start
```

to deploy, just run

```
serverless deploy
```

## The dynamodb table

The table is constructed so that it has
- `fingerprint` as key
- `key` as range
- `value` as the column for the values

`fingerprint` actually concatenates the namespace and the fingerprint.
And `key` is implemented as a range key, since it allows you to query the stored values if that would be needed. For now though, this function isn't implemented, but it could be later.