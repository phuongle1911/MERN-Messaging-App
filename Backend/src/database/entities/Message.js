const { default: mongoose } = require("mongoose");

let MessageSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Types.ObjectId,
      ref: 'RoomChat'
    },
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    attachment: {
      type: mongoose.Types.ObjectId,
      ref: 'File'
    },
    status: {
      type: String,
      validate: {
        validator: function(newStatus) {
          return ['SENT', 'DELIVERED', 'SEEN'].includes(newStatus);
      },
      message: "Invalid Status! Status must be 'SENT', DELIVERED or 'SEEN'"
    }
    }
},
{ timestamps: true }
)

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = {
  MessageModel, MessageSchema
};