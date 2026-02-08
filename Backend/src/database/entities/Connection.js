const { default: mongoose } = require("mongoose");

let ConnectionSchema = new mongoose.Schema(
  {
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  friendId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    require: true
  },
  connectionStatus: {
    type: String,
    validate: {
      validator: function(newStatus) {
        return ['PENDING', 'ACCEPTED'].includes(newStatus);
      },
      message: "Invalid Status! Status must be 'PENDING' or 'ACCEPTED'"
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
}
);

ConnectionSchema.index({ userId: 1, friendId: 1 }, { unique: true });

const ConnectionModel = mongoose.model("Connection", ConnectionSchema);

module.exports = {
  ConnectionSchema, ConnectionModel
};