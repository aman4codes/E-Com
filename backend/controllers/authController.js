import User from "../model/userSchema.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//signUp user
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
         password: hashPassword
      });

      res.json({ message: "User registered successfully" });

   } catch (error) {
      res.status(500).json({
         "message": "Error Occurred",
         "errorMsg": error
      })
   }
}

//login User
export const LoginUser = async (req, res) => {

   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
         return res.status(401).json({
            "message": "User Not Exists"
         });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
         return res.status(401).json({
            "message": "Password Invalid"
         });
      }

      const token = jwt.sign(
         { id:user._id },
         process.env.JWT_KEY,
         { expiresIn: "1d" }
      );

      res.status(200).json({
         "message": "Login Successful",
         token,
         user: {
            id: user._id,
            name: user.name,
            email: user.email
         }
      });

   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
}