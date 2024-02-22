const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref:"categorys"
  },
  categoryName:{
    type:String,
    required: true
  },
  productImg: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  productVerified:{
    type:Boolean,
    default: false
  },
  sellerId:{
    type:mongoose.Schema.ObjectId,
    required:true,
    ref:"userDetails"
  },
  createdOn:{
    type:Date,
    default: Date.now()
  },
  status:{
    type:String,
    enum:{
        values:["Active", "Inactive"]
    },
    default:"Active"
  },
  decription: {
    type: String,
    required: true,
  },
});

productsSchema.methods.createProductId = function (count) {
  const currentDate = new Date();
  const minutes = currentDate.getMinutes();
  return "efca" + minutes * 100 + (count + 1);
};

const ProductModel = mongoose.model("products", productsSchema);

module.exports = ProductModel;
