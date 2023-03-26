const mongoose = require('mongoose');
const MessageModel = require('../models/Message');

//create message
let createMessage = async function(title,timestamp,text,createdBy){
  const message = await MessageModel.create({
    title: title,
    timestamp: timestamp,
    text: text,
    createdBy: createdBy,
  })
  return message;
};
//get message
let getMessage = async function(title,timestamp,text,createdBy){
  const message = await MessageModel.findOne({
    title: title,
    timestamp: timestamp,
    text: text,
    createdBy: createdBy,
  })
  return message;
};
//get all messages
let getAllMessages = async function(){
  const allMessages = await MessageModel.find({});
  return allMessages;
};
//update message
let updateMessage = async function(oldMessage,updatedMessageInput){
  const updatedMessage = await MessageModel.findOneAndUpdate(oldMessage,updatedMessageInput);
  return updatedMessage;
};
//delete message
let deleteMessage = async function(message){
  await MessageModel.deleteOne(message)
};

module.exports = {createMessage,getMessage,getAllMessages,updateMessage,deleteMessage};