const mongoose = require('mongoose');
const UserModel = require('../models/User');

//create user
let createUser = async function(firstName, lastName, userName, password, memberStatus){
  const newUser = await UserModel.create({
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    password: password,
    memberStatus: memberStatus,
  });
  return newUser;
};
//get user
let getUser = async function(userName){
  const user = await UserModel.findOne({userName: userName});
  return user;
};
//get all users
let getAllUsers = async function(){
  const allUsers = await UserModel.find({});
  return allUsers;
};
//update user
let updateUser = async function(userName, userUpdateInput){
  const updatedUser = await UserModel.findOneAndUpdate({userName: userName}, {
    firstName: userUpdateInput.firstName,
    lastName: userUpdateInput.lastName,
    userName: userUpdateInput.userName,
    password: userUpdateInput.password,
    memberStatus: userUpdateInput.memberStatus,
  });
  return updatedUser;
};
//delete user
let deleteUser = async function(userName){
  await UserModel.deleteOne({userName: userName});
};

module.exports = {createUser,getUser,getAllUsers,updateUser,deleteUser};