import bcrypt from "bcrypt";
import User from "../models/user.models";

export const authService = {
  async registerUser(name: string, email: string, password: string, role: "user" | "organizer" | "admin") {
    console.log(name);
    
    if (!name || !email || !password || !role) {
      throw new Error("All fields are required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try{
  var user = await User.create({
    username: name,
    email,
    password: hashedPassword,
    role,
    id: 0
  });

  return user;
}
catch(err){
 console.log("error", err)
}

  },
};
