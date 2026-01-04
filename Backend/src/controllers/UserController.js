const express = require("express");
const { UserModel } = require("../database/entities/User");
const { validateRegisterData, verifyBasicUserAuth, createJwt, verifyJwt, logout  } = require("../middleware/UserCRUDValidation");
const { generateJWT } = require("../middleware/jwtFunctions");
const { ProfileModel } = require("../database/entities/Profile");
const router = express.Router();

// POST: user register route
router.post("/register", validateRegisterData, async (request, response, next)=> {
  if (request.errors.length > 0) {
    return next(new Error(request.errors));
    } else {
      try {
        let newUserData = {...request.body};
        let newUser = await UserModel.create({
          email: newUserData.email.trim(),
          username: newUserData.username.trim(),
          password: newUserData.password.trim()
        })

        const DEFAULT_IMAGES = [
          '/defaults/bored.png',
          '/defaults/glee.png',
          '/defaults/look.png',
          '/defaults/neutral.png',
          '/defaults/smile.png',
          '/defaults/speed.png',
        ];
        
        const getRandomProfilePic = () => {
            return DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)];
        };

        const updateProfile = await ProfileModel.findOneAndUpdate({
          userId: newUser._id,
        }, {
          image: getRandomProfilePic(),
        }, {
          new: true,
          upsert: true
        }).exec();
        
        await updateProfile.save();

        //Create a jwt for the new user
        let jwt = generateJWT(newUser, response);

        response.json({
          data: newUser, 
          jwt : jwt
      });

        next();

      } catch(error) {
          return next(new Error(error));
      }}
});


// POST: user login route
router.post(
  "/login",
  verifyBasicUserAuth,
  createJwt,
  async (request, response) => {
    // response.header("Access-Control-Allow-Origin", "*");

    response.json({
		  message:"login successfully!",
      // jwt : request.authentication.jwt
  })
});

// POST: user log out
router.post("/logout", logout, async (request, response) => {
  response.json({message: "Logout successfully"})
});


//PUT: update an user, only for verified user
router.put(
  "/:targetUserId", 
  verifyJwt,
  async (request, response,next) => {
    requestUserId = request.authentication.id;
    if (requestUserId === request.params.targetUserId) {
      try {
        let updateData = {...request.body};
        updateUser = await UserModel.findByIdAndUpdate(request.params.targetUserId, updateData, {returnDocument: "after"}).exec()
        await updateUser.save();
        response.json(updateUser);
        next();
        } catch(error) {
          return next(new Error("User not found!"));
        }
    } else {
      return next(new Error("Invalid request!"))
    }
});


// GET:  for development testing purpose
router.get(
  "/", verifyJwt, async (request, response) => {
    const allUsers = await UserModel.find({})
    let userArrayExcludeAuthenticatedUser = [];
    for (const user of allUsers) {
      if (user.id != request.authentication.id) {
        userArrayExcludeAuthenticatedUser.push({
          userId: user.id,
          username: user.username,
      })
      }

    }
    response.json(userArrayExcludeAuthenticatedUser)
    
});



router.get("/me", verifyJwt, async (request, response, next) => {
  try {
    const currentUserId = request.authentication.id;
    const currentUser = await UserModel.findById(currentUserId).exec();

    if (!currentUser) {
      return next(new Error("User not found"));
    }

    response.json(currentUser); 
  } catch (error) {
    return next(new Error(error));
  }
});



// DELETE: delete an user, only for verified user
router.delete(
  "/:targetUserId", verifyJwt,
  async (request, response,next) => {
    requestUserId = request.authentication.id;
    if (requestUserId === request.params.targetUserId) {
      try {
        deleteUser = await UserModel.findByIdAndDelete(request.params.targetUserId).exec()
        await ProfileModel.findOneAndDelete({userId: request.params.targetUserId}).exec()
        if (deleteUser) {
        response.json({
          message: 'User deleted successfully',
          deleteData: deleteUser
        });
        } else {
          return next(new Error("User not found!"))
        }
      } catch {
        return next(new Error("User id is not valid!"));
      }
    } else {
      return next(new Error("Invalid request!"))
    }
});

module.exports = router;