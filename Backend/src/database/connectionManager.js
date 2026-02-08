const { default: mongoose } = require("mongoose");

bla bla
async function dbConnect() {
	try {
		let DB_NAME=process.env?.DB_NAME || "DatingAppDatabase";
		let DB_USER=process.env?.DB_USER;
		let DB_PASSWORD=process.env?.DB_PASSWORD;
		let MONGODB_HOST=process.env?.MONGODB_HOST || "127.0.0.1";
		let AUTH_SOURCE=process.env?.AUTH_SOURCE
		let DATABASE_URL=`mongodb://${DB_USER}:${DB_PASSWORD}@${MONGODB_HOST}:27017/${DB_NAME}?authSource=${AUTH_SOURCE}`;

		let targetDatabaseUrl;
		if (!process.env || !DB_USER || !DB_PASSWORD) {
			targetDatabaseUrl="mongodb://127.0.0.1:27017/DatingAppDatabase"
		} else {
			targetDatabaseUrl = DATABASE_URL	
		}
		// let targetDatabaseUrl = DATABASE_URL || "mongodb://127.0.0.1:27017/DatingAppDatabase"
		// if (!process.env || !process.env.DB_USER || !process.env?.DB_PASSWORD || process.env?.MONGO_DB) {
		// 	targetDatabaseUrl="mongodb://127.0.0.1:27017/DatingAppDatabase";
		// };
		console.log("Connecting to database: " + targetDatabaseUrl);
		await mongoose.connect(targetDatabaseUrl);
		console.log("Database connected!");
	} catch (error) {
		console.log("Database connection failed!\n" + JSON.stringify(error));
	}
}


async function dbClose() {
	await mongoose.connection.close();
	console.log("Database disconnected!");
}

module.exports = {
	dbConnect, dbClose
}
