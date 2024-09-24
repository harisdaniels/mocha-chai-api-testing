const chai = require("chai");
const chaiHttp = require('chai-http');
const dotenv = require('dotenv');

const assert = chai.assert;

dotenv.config();
chai.use(chaiHttp);

const url = process.env.URL;
const token = process.env.ACCESS_TOKEN;
describe("As a customer, I want to UPDATE my Order", () => {

  it("It should SUCCESS to change the name of the Customer", (done) => {
    chai.request(url)
      .get("/orders")
      .set("Authorization", "Bearer " + token)
      .then((response) => {
          assert.equal(response.status, 200);
          const orderId = response.body[1].id;

          chai.request(url)
              .patch(`/orders/${orderId}`)
              .set("Authorization", "Bearer " + token)
              .send({
                  "customerName": "Jane Doe"
                })
              .then((response) => {
                  assert.equal(response.status, 204);
                  done();
              });
      })
      .catch((error) => {
          done(error);
      });
  });

  it("It should FAILED to change the name of the Customer, because Order ID is invalid", (done) => {
    chai.request(url)
      .get("/orders")
      .set("Authorization", "Bearer " + token)
      .then((response) => {
          assert.equal(response.status, 200);
          const orderId = "invalidOrderID";

          chai.request(url)
              .patch(`/orders/${orderId}`)
              .set("Authorization", "Bearer " + token)
              .send({
                  "customerName": "Jane Doe"
                })
              .then((response) => {
                  assert.equal(response.status, 404);
                  assert.equal(response.body.error, `No order with id ${orderId}.`)
                  done();
              });
      })
      .catch((error) => {
          done(error);
      });
  });

  it("It should FAILED to change the name of the Customer, because Order ID is not sent", (done) => {
    chai.request(url)
      .get("/orders")
      .set("Authorization", "Bearer " + token)
      .then((response) => {
          assert.equal(response.status, 200);

          chai.request(url)
              .patch(`/orders/`)
              .set("Authorization", "Bearer " + token)
              .send({
                  "customerName": "Jane Doe"
                })
              .then((response) => {
                  assert.equal(response.status, 404);
                  done();
              });
      })
      .catch((error) => {
          done(error);
      });
  });

});