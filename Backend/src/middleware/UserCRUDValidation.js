const { BlackListModel } = require("../database/entities/BlackListJwt");
const { UserModel } = require("../database/entities/User");
const { generateJWT, validateJWT} = require("./jwtFunctions");


//Confirms that a given username and password are correct
async function verifyBasicUserAuth (request, response, next) {
  
  //Get the authorization header from an request
  let authHeader = request.headers["authorization"] ?? null;

  //if no header is provided, exit
  if (authHeader == null) {
    return next(new Error("No auth data given"));
  }
  
  //Check its a basic auth string
  if (authHeader.startsWith("Basic ")) {
    authHeader = authHeader.substring(5).trim();
  }

  //Decode the auth
  let decodedAuth = Buffer.from(authHeader, 'base64').toString('ascii');

  // Convert it into a usable object.
  let objDecodedAuth = {email: '', password: ''};
  objDecodedAuth.email = decodedAuth.substring(0, decodedAuth.indexOf(":"));
  objDecodedAuth.password = decodedAuth.substring(decodedAuth.indexOf(":") + 1);

	// Check if a user exists for the given login email.
	let foundUser = await UserModel.findOne({email: objDecodedAuth.email}).select({
    email: 1,
    username: 1,
    salt: 1,
    password: 1,
  });

	if (!foundUser || foundUser == null) {
		return next(new Error("No user found for the given auth data."));
	}

  //Check if the password matches the found user
	let doesPasswordMatch = await foundUser.isMatchingPassword(objDecodedAuth.password);
	if (!doesPasswordMatch) {
    //Do not let the error know that the password is incorrect
		return next(new Error("No user matches the given auth data."));
	}

  //Set up extra data for other middleware
	request.authentication = {
		...request.authentication,
		id: foundUser.id,
		user: foundUser
	}


  next();

}


//Create a JWT
async function createJwt (request, response, next) {
	// createJwt is used in a middleware chain after verifyBasicUserAuth has been called.

	//The ? is used here to make sure that request.authentication exists before finding .user
	if (!request.authentication?.user) {
		return next (new Error("Something went wrong with your session, please sign out and log in again later."));
	};

	// Create a new JWT based on the user established earlier
	let newJwt = generateJWT(request.authentication.user, response);

  //Add jwt to the authenticatrion
	request.authentication = {
		...request.authentication,
		jwt: newJwt
	};

	// the last endpoint should handle sending the JWT to the user
	next();
}

async function verifyJwt (request, response, next) {

  const authCookie = request?.cookies?.authcookie ?? null;

  //if no auth cookie is provided, exit
  if (authCookie == null) {
    return next(new Error("No auth cookie data given"));
  }

	try {
    //Validate the JWT
		let tokenVerificationResult = await validateJWT(authCookie);

    //Check if the jwt has been logged out
    let findJwtInBlackList = await BlackListModel.findOne({oldjwt: authCookie});
    
    if (findJwtInBlackList) {
      return next(new Error("User has logged out, please log in again!"))
    }

    request.authentication = {
      ...request.authentication,
      id: tokenVerificationResult.tokenUser.id
    };
		// If all is good, no errors will be thrown.
    //Now refresh the jwt so that the users session lasts longer
		generateJWT(tokenVerificationResult.tokenUser, response);


    //Next middleware
		next();

	} catch (error) {
		// We can check for different errors based on their names, and the `jsonwebtoken` package
		if (error.name == "TokenExpiredError"){
			return next(new Error("Session expired, please log in again."));
		} else {
			return next(new Error(error));
		}
	}
}

async function logout(request, response, next) {
  // let authHeader = request.headers["authorization"] ?? null;
  const authCookie = request?.cookies?.authcookie ?? null;

  //if no header is provided, exit
  if (authCookie == null){
    return next(new Error("No auth cookie data given"));
  }

  try {
    //Validate the JWT
		await validateJWT(authCookie);

    await BlackListModel.create({oldjwt: authCookie});
    response.clearCookie("authcookie");
    next();

  } catch(error) {
    return next(new Error(error))
  }
};


async function validateRegisterData (request, response, next) {
  let errors = [];

  if (request.body.username) {
    let newUsername = request.body.username.trim().toLowerCase()
    let findUsername = await UserModel.findOne({ username: newUsername }).exec()
    if (findUsername) {
      errors.push("Username already existed, please choose another username!")
    }
  } else {
    errors.push("username missing!")
  }

  if (request.body.email) {
    let newUserEmail = request.body.email.trim().toLowerCase()
    let findUserEmail = await UserModel.findOne({ email: newUserEmail }).exec()
    if (findUserEmail) {
      errors.push("Email already existed!")
    }
  } else {
    errors.push("Email missing!")
  }

  if (!request.body.password) {
    errors.push("Password missing!")
  }
  request.errors = errors;

  next()
  };
    
  module.exports = {
    validateRegisterData,
    verifyBasicUserAuth,
    createJwt,
    verifyJwt,
    logout
  }