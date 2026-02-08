const express = require("express");
const multer = require("multer");
const router = express.Router();
const { ProfileModel } = require("../database/entities/Profile");
const { verifyJwt } = require("../middleware/UserCRUDValidation");
const { UserModel } = require("../database/entities/User");



// view user profile 
router.get(['/', '/:userId'], verifyJwt, async (request, response,next) => {
  const userId = request?.params?.userId || request?.authentication?.id;
  try {
  const user = await UserModel.findById(userId).exec();
  const profile = await ProfileModel.findOne({ userId: userId }).exec();
      response.json({
        username: user?.username,
        email: user?.email,
        description: profile?.description,
        image: profile?.image,
      });
    } catch(error) {    
    return next(new Error(error))
  }

});


const storage = multer.diskStorage({
  destination: function (request, fie, cb) {
    try {
    cb(null, './src/public/uploads/')
    } catch (err) {
      console.log(err);
    }
  },
  filename: (request, file, cb) => {
    console.log(file);
    cb(null,`${request.authentication.id}-${Date.now()}-${file.originalname}`);
  }
});


// update profile, with user authorisation
const imageUpload = multer({storage: storage})

router.patch('/edit', verifyJwt, imageUpload.single('image'), async (request, response, next) => {
  let imageFilename = request.file?.filename;

  try {
    const updateData = {...request.body, image: imageFilename};

    const updateProfile = await ProfileModel.findOneAndUpdate({
      userId: request.authentication.id
    }, updateData, {
      new: true,
      upsert: true
    }).exec();

    await updateProfile.save();

    response.json(updateProfile);

  } catch(error) {
    return next(new Error(error));
  }
});

module.exports = router;