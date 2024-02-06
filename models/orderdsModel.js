const { string } = require("joi");
const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  oredrId: {
    type: String,
    required: true,
  },
  ProductQuantity:{
    type:String,
    required:true
  },
  totalAmount:{
    type:Number,
    required:true
  },
  productId: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  orderAddress: {
    type: String,
    required: true,
  },
  customerNumber: {
    type: String,
    required: true,
  },
  customerCountry: {
    type: String,
    required: true,
  },
  customerState: {
    type: String,
    required: true,
  },
  customerPincode: {
    type: String,
    required: true,
  },
  customerCity: {
    type: String,
    required: true,
  },
  trackingId: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  createdOn:{
    type:Date,
    default:Date.now()
  },
  orderYear:{
    type:Date,
    default:Date.now().getFullYear()
  }
});

ordersSchema.methods.createOrderId = function (data) {
  const { count } = data;
  const currentDate = new Date();
  const millSec = currentDate.getMilliseconds();
  const minutes = currentDate.getMinutes();
  const time = millSec + minutes;
  return "efor"+this._id+count;
};

const OrderModel = mongoose.model("orders", ordersSchema)

module.exports = OrderModel
