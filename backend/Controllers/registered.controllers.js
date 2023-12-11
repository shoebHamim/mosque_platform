const Mosque = require("../Models/mosqueModel");


const getAllRegistered=async(req,res)=>{
  try {
    const mosques = await Mosque.find({});
    res.json(mosques);
  } catch (err) {
    console.error('Error fetching registered:', err);
    res.status(500).send('Error fetching registered');
  }
}
const getOneRegistered = async (req, res) => {
  try {
    const mosque = await Mosque.findOne({ email: req.params.email });
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