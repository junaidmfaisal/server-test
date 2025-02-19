import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';


export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude password
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, '-password'); // Exclude password
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};


// register
export const register  = async (req,res)=>{
    console.log("Inside register controller");
     console.log(req.body);

const{name,email,password,phone} = req.body
try{
    const existingUser = await User.findOne({email});
        if(existingUser) {
          res.status(406).json("User already exist...please login");
        }
        else {
            const newUser = new User({ 
                name, email, password,phone
            })
            await newUser.save();
            res.status(200).json(newUser);
        }
}catch (err) {
    console.log(err);
    
}

}

// login
export const login = async (req, res)=>{
    console.log("login controller");
    const {email, password} = req.body
    console.log(email, password);
    try {
        const existingUser = await User.findOne({email, password})
        if(existingUser){
            // token generationr
            const token = jwt.sign({userID:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({user : existingUser,token})
        }else{
            res.status(404).json("Incorrect email/Password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}