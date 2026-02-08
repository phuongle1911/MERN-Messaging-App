const { default: mongoose } = require("mongoose");

let RoomChatSchema = new mongoose.Schema(
  {
  creationDate: {
    type: Date,
    default: Date.now()
  },
  name: String,
  participants: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }],
  type: {
    type: String,
    validate: {
      validator: function(typeValue) {
        return ['DIRECT', 'GROUP'].includes(typeValue);
      },
      message: "Invalid type! Room chat type must be 'GROUP' or 'DIRECT'"
    }
  }
}
)

RoomChatSchema.pre('save', function(next) {
  if (this.participants && this.participants.length === 2){
    this.type = 'DIRECT'
  }else{
    this.type = 'GROUP'
  }

  next();
})

const RoomChatModel = mongoose.model("RoomChat", RoomChatSchema);

module.exports = {
  RoomChatModel, RoomChatSchema
};