const clientData = require("../utilities/utilities.js");

const CREATE_ORDER_DATA_VALID = {
  bookId: 1,
  customerName: "John"
}

const CREATE_ORDER_DATA_INVALID = {
  bookId: 2,
  customerName: "John"
}

const CREATE_ORDER_DATA_NO_ID = {
  customerName: "John"
}

const UPDATE_ORDER_DATA_VALID = {
  customerName: "Jane Doe"
}

const CLIENT_DATA = {
  clientName: clientData.generateText(),
  clientEmail: clientData.generateEmailFormat()
}

module.exports = {CREATE_ORDER_DATA_VALID, CREATE_ORDER_DATA_INVALID, CREATE_ORDER_DATA_NO_ID, UPDATE_ORDER_DATA_VALID, CLIENT_DATA}