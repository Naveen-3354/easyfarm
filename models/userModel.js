const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is a required field."],
      minLength: [4, "Username is less than 4 characters."],
      maxLength: [15, "Username is greater than 15 characters."],
    },
    userId: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is a required field."],
      validate: {
        validator: function (value) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    number: {
      type: String,
      required: [true, "Mobile number is a required field"],
      minLength: [10, "Number is less than 10 digits"],
      validate: {
        validator: function (value) {
          return /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(
            value
          );
        },
        message: (props) => `${props.value} is not mobile number!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
      minLength: [8, "Password is less than 8 characters"],
      // maxLength:[15, "Password is greater than 15 characters"],
      // validate:{
      //     validator: function (value){
      //         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
      //     },
      //     message:(props)=>`${props.value} should contain at least one uppercase letter, one lowercase letter, one number and one special character.`
      // }
    },
    proffileImg: {
      type: String,
    },
    status: {
      type: String,
      enum: {
        values: ["Active", "Inactive"],
        message: "{VALUE} is not valid.",
      },
      default: "Active",
    },
    createdOn: {
      type: Date,
      default: Date.now(),
    },
    role:{
        type:String,
        enum:{
            values:["USER", "ADMIN", "DEVELOPER"]
        },
        default:"USER"
    }
  },
  {
    versionKey: false,
  }
);

userSchema.methods.createUserId = function (count) {
  const currentDate = new Date();
  const minutes = currentDate.getMinutes();
  return "efus" + minutes*100 + (count+1);
};  

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { userId: this.userId, role: this.role, userName : this.userName},
    process.env.JWT_SECRET_KEY,
    { algorithm: "HS256", expiresIn: process.env.JWT_EXP_TIME }
  );
    return token;
}

const UserModel = mongoose.model("userDetails", userSchema);


module.exports = UserModel;
