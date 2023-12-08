const User = require("../Models/userModel");


const getAllUsers=async(req,res)=>{
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Error fetching users');
  }
}
const userExistsbyEmail=async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email: email });
  res.send(user)
}

const createUser = async (req, res) => {
  const userData = req.body;
  const newUser = new User(userData);
  try {
    const result = await newUser.save();
    res.send(result);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
}
const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('No mosque found with this ID');
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching mosque:', err);
    res.status(500).send('Error fetching mosque');
  }
}

module.exports={getAllUsers,userExistsbyEmail,createUser,getOneUser}