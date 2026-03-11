import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, minlength:[2, 'Name should be atleast 2 characters'], maxlength:[100, 'Name should be at most 100 characters'] },
    email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
    password: { type: String, required: [true, 'Password is required'], minlength: [8, 'Password must be at least 8 characters long'], select: false},
    birthdate: {type: Date, 
    validate: {
        validator: (value) => !value || value <= new Date(),
        message: 'Birthdate cannot be in the future',
      }
  },
    userphoto: {},
    userrole: {type: String, enum: {values: ['user','admin','moderator'], message: '{VALUE} is not a valid role'},default: 'user',index: true}
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;