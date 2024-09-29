# This Is My Sample Portfolio of API Testing Using Mocha and Chai

## Project Information
For this project, i use: 
- Mocha Framework (https://mochajs.org/)
- Chai Assertion Library (https://www.chaijs.com/)
- Chai HTTP for HTTP integration testing (https://github.com/chaijs/chai-http#readme)
- dotenv (https://www.npmjs.com/package/dotenv) for storing environment variables **(optional)**
- mochawesome (https://www.npmjs.com/package/mochawesome) for reporting the result of the test **(optional)**
- https://simple-books-api.glitch.me (from @vdespa). API that i use for testing.
- Postman (https://www.postman.com/) for generating Access Token

### Mocha Framework
Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. 
Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases. Hosted on GitHub.

### Chai Assertion Library
Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.

### Chai HTTP
HTTP integration testing with Chai assertions.

### Dotenv
Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`.
Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

### Mochawesome
Mochawesome is a custom reporter for use with the Javascript testing framework, mocha. 
It runs on Node.js (>=10) and works in conjunction with mochawesome-report-generator to generate a standalone HTML/CSS report to help visualize your test runs.

### API
For this simple project, i use API https://simple-books-api.glitch.me. 
The documentation can be found [here](https://github.com/vdespa/introduction-to-postman-course/blob/main/simple-books-api.md).

### Postman
Postman is a collaboration platform for API development. 
Postman's features simplify each step of building an API and streamline collaboration so you can create better APIs—faster.
You can download Postman [here](https://www.postman.com/downloads/)

## Preparation

### Clone Repo
- Clone from this repo https://github.com/harisdaniels/mocha-chai-api-testing.git.
- The steps of cloning Github Repository, can be found [here](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository).

### Setup
For windows and mac, you can [download node](https://nodejs.org/en/) and install.

### Package Installation
Before start development and running the test you need to install packages that needed for this simple project. To install them, you need to do these step:

- Go to your project repo directory in your local machine with your favorite terminal.
- and type `npm install` in your terminal and press ENTER on your keyboard
- wait, and done

### [OPTIONAL] Generating Access Token from Postman (API Authentication)
To submit or view an `/orders`, you need to register your API client.

The request body needs to be in JSON format and include the following properties:
- `clientName` - String
- `clientEmail` - String

Example :
```
{
   "clientName": "test",
   "clientEmail": "testemail200@example.com"
}
```
#### To do that, you can follow the steps as shown below:
- Open your Postman tool
- Copy and paste https://simple-books-api.glitch.me/api-clients/ in the Postman URL field
- Select Method POST
- Select **Body** tab and Click **raw**
- Put `{ "clientName": "test", "clientEmail": "testemail200@example.com" }` as **JSON** format
- Click SEND
- And Postman will generate access token for you`


## Test Structure
- Use `describe` function to create Test Suite (group of test cases)
- Use `It` function to create a test case
- Example:
```
const chai = require("chai");
const chaiHttp = require('chai-http');
const dotenv = require('dotenv');

const assert = chai.assert;
const data = require("../base-helper/data/data.js");
const token = require("./a-get-main-page.js");

dotenv.config();
chai.use(chaiHttp);

const url = process.env.URL;

describe("As a customer, I want to make an order", () => {
    
  it("It should SUCCESS to MAKE an ORDER", (done) => {
    chai
      .request(url)
      .post('/orders')           
      .set("Authorization", "Bearer " + token.tokenId())
      .send(data.CREATE_ORDER_DATA_VALID)
      .then((response) => {
          assert.equal(response.status, 201);
          assert.equal(response.body.created, true);
          chai.expect(response.body).to.have.property("orderId");

          done();
      })
      .catch((error) => {
          done(error);
      });    
  });
    
});
```

## Run Test
You can run your test by simply type `npm run test` command in your terminal, then press ENTER on your keyboard. And, the API Testing will run
![image](https://drive.google.com/uc?export=view&id=1AvWtgQn9JbGL1ycUF9q-TTp4duiijLm6)
The result will be like this.


## Test Report by Mochawesome
After run the test, you can also see the result of the test by copying the html file and paste it to search bar of your browser
![Screenshot_3](https://user-images.githubusercontent.com/74105380/126753467-962baa95-f743-43ff-bf88-56b5adbcdfd3.jpg)


### Test Report Sample
![Screenshot_5](https://user-images.githubusercontent.com/74105380/126753428-ebe4b120-c669-48af-822a-154c77fc229b.jpg)
The result will be like this.

## Run Test through Github Actions
- Go to `Actions` tab on the top of Github page
- Choose `Run API Automation` workflow
- Click `Run Workflow` dropdown on the right side of the page
- Click `Run Workflow` button


# All is Done!
