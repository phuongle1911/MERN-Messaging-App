const express = require("express");
const { ConnectionModel } = require("../database/entities/Connection");
const { verifyJwt } = require("../middleware/UserCRUDValidation");
const { viewAllConnection } = require("../middleware/ConnectionValidation");

const router = express.Router();

testing
router.post('/', verifyJwt, async (request, response,next) => {
  const requestUserId = request.authentication.id;

  let newConnectionData = {...request.body};
  try {
    let newConnection = await ConnectionModel.create({
      userId: requestUserId,
      friendId: newConnectionData.friendId,
      connectionStatus: newConnectionData.connectionStatus,
      date: newConnectionData.date
    });
    await newConnection.save();
    response.json(newConnection);
    next();
  } catch(error) {
    return next(new Error(error));
  }

});

router.delete('/:connectionId', verifyJwt, async (request, response,next) => {
  const requestUserId = request.authentication.id;
  try {
   let deleteConnection = await ConnectionModel.findById(request.params.connectionId).exec();
   if (deleteConnection) {
    let isUserInConnection = (
      (requestUserId === deleteConnection.userId.toString('utf8')) || (requestUserId === deleteConnection.friendId.toString('utf8'))
    );
    if (!isUserInConnection) {
      return next(new Error("Invalid request! You are not authorised to delete this connection"))
    } else {
      await ConnectionModel.deleteOne(deleteConnection);
        response.json({
          message:"connection deleted successfully",
          deleteData: deleteConnection
        });
    }

    next()
  } else {
    return next(new Error("Connection not found!"))
   }
  // eslint-disable-next-line no-unused-vars
  } catch(error) {
    return next(new Error("Connection id is not valid!"));
  }
})

// VIEW all connection the user has
router.get('/', verifyJwt, viewAllConnection);


// view all connection in database, for development testing purpose
// router.get('/all', async (request, response) => {
//   allConnection = await ConnectionModel.find({})
//   response.json(allConnection)
// });

module.exports = router;
