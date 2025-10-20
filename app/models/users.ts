import mongoose from '#config/mongo'

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', UserSchema)
