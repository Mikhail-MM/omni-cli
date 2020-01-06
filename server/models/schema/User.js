const User = {
  firstName: { type: String, required: true, },
  lastName: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true, },
  dateJoined: { type: Date, required: true, },
  avatarURL: { type: String, required: true, },
  organizationID: { type: String },
}