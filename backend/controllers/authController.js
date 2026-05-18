import User from "../model/userSchema.js"
import bcrypt from "bcryptjs";

export const userSignUp = async (req, res) => {
   try {
      const { name, email, password } = req.body;

      //check user exists
      if (await User.findOne({ email })) {
         return res.status(400).json({ "message": "User already exists" });
      }

      //hash password
      const hashPassword = await bcrypt.hash(password, 10);

      //create user
      await User.create({
         name,
         email,
         password : hashPassword
      });

      res.json({ message: "User registered successfully" });

   } catch (error) {
      res.status(500).json({
         "message": "Error Occurred",
         "errorMsg": error
      })
   }
}
