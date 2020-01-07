import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    hash: { type: String, required: true },
    dateJoined: { type: Date, required: true, default: Date.now }, // Pass Date.now function just in case
    avatarURL: { type: String, required: true, default: '/assets/images/defaultAvatar.jpg' },
    phone: String,
    address: {
      billing_address_line1: String,
      billing_address_line2: String,
      billing_address_city: String,
      billing_address_zip: String,
      billing_address_state: String,
      shipping_address_line1: String,
      shipping_address_line2: String,
      shipping__address_city: String,
      shipping_address_zip: String,
      shipping_address_state: String,
    },
    omniProfile: {
      isActive: { type: Boolean, required: true, default: false },
      isAdmin: { type: Boolean, required: true, default: false },
      organizationID: String,
    },
    marketplaceProfile: {
      isActive: { type: Boolean, required: true, default: false },
    },
  },
  {
    toObject: { getters: true },
  });

const UserModel = mongoose.model('UserModel', UserSchema);

export {
  UserModel
}