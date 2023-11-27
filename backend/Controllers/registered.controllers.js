const Registered = require("../Models/registeredModel");


const getAllRegistered=async(req,res)=>{
  try {
    const mosques = await Registered.find({});
    res.json(mosques);
  } catch (err) {
    console.error('Error fetching registered:', err);
    res.status(500).send('Error fetching registered');
  }
}
const getOneRegistered = async (req, res) => {
  try {
    const mosque = await Registered.findById(req.params.id);
    if (!mosque) {
      return res.status(404).send('No mosque found with this ID');
    }
    res.json(mosque);
  } catch (err) {
    console.error('Error fetching mosque:', err);
    res.status(500).send('Error fetching mosque');
  }
};

module.exports={getAllRegistered,getOneRegistered}