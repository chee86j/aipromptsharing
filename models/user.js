import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

/*  const User = model("User", UserSchema);
    we would use this line if we were using a regular always-on server,
    back-end server, but with Next.js it is only running when it is called
*/

export default User;

/*  The "models" object is provided by the Mongoose library and 
    it is used to store all the registered models.

    If a model named "User" already exists, it assigns that
    existing model to the "User" variable. If not, it creates a new one
    with the new model being assigned to the "User" variable.
    
    This prevents redefining the model and causing an error ensuring
    the existing model is reused.
*/
