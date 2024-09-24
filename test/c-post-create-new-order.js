const chai = require("chai");
const chaiHttp = require('chai-http');
const dotenv = require('dotenv');

const assert = chai.assert;

dotenv.config();
chai.use(chaiHttp);

const url = process.env.URL;
const token = process.env.ACCESS_TOKEN; 
describe("As a customer, I want to make an order", () => {
    
  it("It should SUCCESS to MAKE an ORDER", (done) => {
    chai
      .request(url)
      .post('/orders')           
      .set("Authorization", "Bearer " + token)
      .send({
          "bookId": 1,
          "customerName": "John"
      })
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

  it("It should FAILED to MAKE an ORDER because the book is NOT available", (done) => {
    chai
      .request(url)
      .post('/orders')           
      .set("Authorization", "Bearer " + token)
      .send({
          "bookId": 2,
          "customerName": "John"
      })
      .then((response) => {
          assert.equal(response.status, 404);
          assert.equal(response.body.error, "This book is not in stock. Try again later.");
          done();
      })
      .catch((error) => {
          done(error);
      });    
  });

  it("It should FAILED to MAKE an ORDER because there is no ID to input", (done) => {
    chai
      .request(url)
      .post('/orders')           
      .set("Authorization", "Bearer " + token)
      .send({
          "customerName": "John"
      })
      .then((response) => {
          assert.equal(response.status, 400);
          assert.equal(response.body.error, "Invalid or missing bookId.");
          done();
      })
      .catch((error) => {
          done(error);
      });    
  });
    
});
