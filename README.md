# Azure asymmetric decoding functional key

## Installation

```bash
$ npm install
```

## Running the service locally

```bash
# az function start
$ npm run start

# typescript tsc watching compiling mode (while development)
$ npm run watch
```

## Test

```bash
# unit tests --watchMode
$ npm run test

# test coverage
$ npm run test:coverage
```

## Generate our public/private pems.

Generating RSA private .pem file
```bash
openssl genrsa -out {location.pem}
```

Generating RSA public .pem file from existing private .pem file. 
```bash
 openssl rsa -in {private.pem-location} -pubout -out {location.pem}
```

These keys must be placed in `az-authentication/keys`.

### Suggestions
If you want a quick deployment, you can use AZ functions Toolkit for that.