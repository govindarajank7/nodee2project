import User from '../models/userModel.mjs';

export async function createUserDB(data) {
  return await User.create(data);
}

export async function getAllUsersDB() {
  return await User.find();
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