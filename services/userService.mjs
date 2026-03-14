import User from '../models/userModel.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createUserDB(data, file) {
    const hashedPassword = await bcrypt.hash(data.userpassword,10);
    const user = new User({
    username: data.username,
    useremail: data.useremail,
    userpassword: hashedPassword,
    userbirthdate: data.userbirthdate,
    userphoto: file ? file.filename : null,
    userrole: data.userrole
  });
  return await User.create(user);
}

export async function getAllUsersDB() {
  return await User.find().lean();
}

export async function getUserByIdDB(id) {
  return await User.findById(id);
}

export async function updateUserDB(id, data) {
  return await User.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteUserDB(id) {
  return await User.findByIdAndDelete(id);
}

export async function loginUserDB(useremail, userpassword) {
  const user = await User.findOne({useremail});
  if(!user) {
    throw new Error("User Not Found");
  }

  const isMatch = await bcrypt.compare(userpassword, user.userpassword);

  if (!isMatch) {
    throw new Error("Invalid Password");
  }
  const token = jwt.sign({id: user._id, role: user.userrole},'helpme', {expiresIn:'1h'});

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      useremail: user.useremail,
      userrole: user.userrole
    }
  };
}