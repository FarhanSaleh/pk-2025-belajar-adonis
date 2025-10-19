import mongoose from '#config/mongo'

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', UserSchema)
