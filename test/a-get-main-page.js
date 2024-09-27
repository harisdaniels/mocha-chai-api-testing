const chai = require("chai");
const chaiHttp = require('chai-http');
const dotenv = require('dotenv');

const assert = chai.assert;
const data = require("../base-helper/data/data.js");

dotenv.config();
chai.use(chaiHttp);

const url = process.env.URL;
let accessToken;
describe('As a customer, I want to see the Main Page', () => {

  // Generate token before run all tests
  before(function (done) {
    chai
      .request(url)
      .post('/api-clients')
      .send(data.CLIENT_DATA)
      .then((response) => {
        assert.equal(response.status, 201);
        accessToken = response.body.accessToken;
      }).then(done, done);
  });

  it("It should SUCCESS to load Welcome Page", (done) => {
    chai.request(url)
      .get("/")
      .then((response) => {
          assert.equal(response.status, 200);
          assert.equal(response.body.message, "Welcome to the Simple Books API.");
          done();
      })
      .catch((error) => {
          done(error);
      });
  });

  it("It should SUCCESS to load Status Page", (done) => {
    chai.request(url)
      .get("/status")
      .then((response) => {
          assert.equal(response.status, 200);
          assert.equal(response.body.status, "OK");
          done();
      })
      .catch((error) => {
          done(error);
      });
  });

});

function tokenId() {
  return accessToken;
}

module.exports = { tokenId };