import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, 'Name is required'], trim: true, minlength:[2, 'Name should be atleast 2 characters'], maxlength:[100, 'Name should be at most 100 characters']},
    useremail: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
    userpassword: { type: String, required: [true, 'Password is required'], minlength: [8, 'Password must be at least 8 characters long']},
    userbirthdate: {type: Date, 
    validate: {
        validator: (value) => !value || value <= new Date(),
        message: 'Birthdate cannot be in the future',
      }
  },
    userphoto: {},
    userrole: {type: String, enum: {values: ['SuperAdmin','ViewAdmin','EditAdmin'], message: '{VALUE} is not a valid role'},default: 'ViewAdmin',index: true}
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;