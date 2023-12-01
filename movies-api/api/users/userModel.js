import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true }
});

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;


const passwordValidator = (password) => {
  return passwordRegex.test(password);
};

UserSchema.path("password").validate({
  validator: passwordValidator,
  message: (props) =>
    `${props.value} password to be at least 8 characters long and contains at least one characters, digit, and special character.`,
});

export default mongoose.model('User', UserSchema);