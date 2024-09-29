const chai = require("chai");
const chaiHttp = require('chai-http');
const dotenv = require('dotenv');

const token = require("./a-get-main-page.js");

const assert = chai.assert;
dotenv.config();
chai.use(chaiHttp);

const url = process.env.URL;

describe("As a customer, I want to delete my Order", () => {   

  it("It should SUCCESS to delete one of the customers by Order ID", (done) => {
    chai.request(url)
      .get("/orders")
      .set("Authorization", "Bearer " + token.tokenId())
      .then((response) => {
        assert.equal(response.status, 200);
        try {
            const orderId = response.body[1].id;
            chai.request(url)
                .delete(`/orders/${orderId}`)
                .set("Authorization", "Bearer " + token.tokenId())
                .then((response) => {
                    assert.equal(response.status, 204);
                    done();
                });                    
        } catch (error) {
            // Check if There is NO Order ID to DELETE, Should give ERROR
            chai.request(url)
                .delete(`/orders/`)
                .set("Authorization", "Bearer " + token.tokenId())
                .then((response) => {
                    assert.equal(response.status, 404);
                    done();
                });
        }
      })
      .catch((error) => {
          done(error);
      });
  });
});