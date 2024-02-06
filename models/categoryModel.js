const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Username is a required field."],
    minLength: [4, "Username is less than 4 characters."],
    maxLength: [15, "Username is greater than 15 characters."],
  },
  categoryId : {
    type : String,
    // required: [true, "Username is a required field."],
    minLength: [4, "Username is less than 4 characters."],
    maxLength: [15, "Username is greater than 15 characters."],
  },
  createdBy:{
    type:[String],
    required: [true, "Username is a required field."],
  },
  createdOn:{
    type: Date,
    default: Date.now()
  },
  image:{
    type:String,
    // required: true
  },
  status:{
    type:String,
    enum:["Active", "Inative"],
    default:"Active"
  }
});

categorySchema.methods.createCategoryId = function (count){
  const currentDate = new Date();
  const minutes = currentDate.getMinutes();
  return "efca" + minutes*100 + (count+1);
}

const CategoryModel = mongoose.model("categorys", categorySchema)

module.exports =CategoryModel
