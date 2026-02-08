const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const { RoomChatModel } = require("../database/entities/RoomChat");
const { UserModel } = require('../database/entities/User');
const { verifyJwt  } = require("../middleware/UserCRUDValidation");
const { canViewRoom  } = require("../middleware/RoomChatValidations");
const { viewAllRooms } = require('../middleware/RoomValidation');
// const { MessageModel } = require('../database/entities/Message');
const router = express.Router();

// Create a room chat
router.post('/', 
  verifyJwt,
  async  (request, response,next) => {

  let userId = request.authentication.id;

  // Validate that its a valid id
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user id');
  }

  //Find the user creating the room
  const user = await UserModel.findById(userId).exec();

  let newRoomData = {...request.body};

  try {
    
    let importedParticipants = newRoomData?.participants;
    let participants = [user.id]

    //Go through all given participants and make sure they are valid
    for(let i = 0; i < importedParticipants.length; i ++) {
      //If any are not valid throw an error
      
      let newParticipant = await UserModel.findById(importedParticipants[i]).exec();
      if (newParticipant == null){
         throw new Error('Invalid participant id');
      } else{
        //if the found user is the same as the user calling, we dont have to add the user calling to the array
        if (newParticipant.id == user.id){
          continue
        }

        participants.push(importedParticipants[i])
      }
    }

    // check if the room for these users existed?
    let findRoom = await RoomChatModel.findOne({participants:participants});
    if (findRoom) {
      response.json(findRoom)
      next()
    } else {
      let newRoom = await RoomChatModel.create({
      name: newRoomData?.name,
      participants: participants,
      type: newRoomData.type
    });
    await newRoom.save();
    response.json(newRoom);
    next();
    }
    //Create the room model
 

  } catch(error) {
    return next(new Error(error));
  }
});

// view room chat
router.get('/:roomChatId', 
  verifyJwt,
  canViewRoom,
  async  (request, response,next) => { 
    response.json({
      message:"Joined room!",
      room: request.room 
     })  
});

/*
This is for testing on websocket for instant chat feature between 2 users in a room chat. 
using jwt from 2 users, this route is for testing purpose only, and will be removed in final app deployment
route for user 1: http://localhost:3000/rooms/debug/roomId?jwt=user1Jwt
route for user 2: http://localhost:3000/rooms/debug/roomId?jwt=user2Jwt 
Note: to be able to test this, you will need to resgiter 2 new users using '/users/register' route, 
log in these users using '/users/login' route to get new generated Jwt 
*/
router.get('/debug/join/:roomChatId', 
  verifyJwt,
  canViewRoom,
  async  (request, response, next) => {
    const jwt = request.authentication.jwt; // from verifyJwt middleware
    const roomId = request.params.roomChatId;
    response.redirect(`http://localhost:3000/rooms/debug/${roomId}?jwt=${jwt}`);
});
/*
examples for routes to test
user 1 : http://localhost:3000/rooms/debug/690ae443d184e176f8c18522?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTBhZTBkNjhkNmYzNDg0NzcyYmZjZGEiLCJpYXQiOjE3NjI1NzEwMDIsImV4cCI6MTc2MjY1NzQwMn0.NapRXPQ1zo8d8JuOtlcxeSSo3_Emq325M9eNV_2o23s
user 2: http://localhost:3000/rooms/debug/690ae443d184e176f8c18522?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTA4ODIwMzM3MDZhYTE5ZWVjYzU5MzEiLCJpYXQiOjE3NjI1NjgyNzgsImV4cCI6MTc2MjY1NDY3OH0.49C83eF_SRWtxzwg4os4zfttD_m3dnZ0jjnHxZr-bp4
*/

//Debugging room joining
router.get('/debug/:roomChatId', 
  async  (request, response, next) => {
    response.sendFile(path.join(__dirname, "..", "public", "index.html"));
});



// Update room chat information
router.put('/:roomChatId', 
  verifyJwt,
  canViewRoom,
  async  (request, response,next) => {
  try {
    let updateData = {...request.body};
    let updateRoom = await RoomChatModel.findByIdAndUpdate(request.params.roomChatId, updateData, {returnDocument: "after"}).exec()
    await updateRoom.save();
    response.json(updateRoom);
    next();
    // eslint-disable-next-line no-unused-vars
    } catch(error) {
      return next(new Error("Room not found!"));
    };
});

// delete a room chat
router.delete('/:roomChatId', 
  verifyJwt,
  canViewRoom,
  async  (request, response,next) => {
    try {
      let deleteRoom = await RoomChatModel.findByIdAndDelete(request.params.roomChatId).exec()
      if (deleteRoom) {
      response.json({
        message: 'Room is deleted successfully',
        deleteData: deleteRoom
      });
      } else {
        return next(new Error("Room not found!"))
      }
  } catch {
    return next(new Error("Room id is not valid!"));
  }
});

// VIEW all rooms a user has
router.get('/', verifyJwt, viewAllRooms);


// for development testing purpose only
// router.get('/', async  (request, response) => {
//   allRoom = await RoomChatModel.find({});
//   response.json(allRoom);
// });

// router.get('/messages', async  (request, response) => {
//   allMessages = await MessageModel.find({});
//   response.json(allMessages);
// });


module.exports = router;