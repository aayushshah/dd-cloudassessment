# Data Ductus cloud assessment

### Requirements
- Node JS v12.2.0
- NPM v6.9.0
- [Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Installation
Clone the git repository.
```bash
$ git clone https://github.com/aayushshah/dd-cloudassessment.git 
```

Change to project directory.

``` bash
$ cd cd-cloudassessment
```

Install the Node.js packages

``` bash
$ npm install
```

### Usage

To run a function on your local

``` bash
$ serverless invoke local --function list
```

``` bash
$ serverless invoke local --function user --path test/user-event.json
```

``` bash
$ serverless invoke local --function register --path test/register-event.json
```
