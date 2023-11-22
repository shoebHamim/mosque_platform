const Mosque = require("../Models/mosqueModel");


const getAllMosques=async(req,res)=>{
  try {
    const mosques = await Mosque.find({});
    res.json(mosques);
  } catch (err) {
    console.error('Error fetching mosque:', err);
    res.status(500).send('Error fetching mosque');
  }
}
const mosqueExistsbyEmail=async (req, res) => {
  const email = req.params.email;
  const mosque = await Mosque.findOne({ email: email });
  res.send({found:mosque?true:false})
}
const createMosque = async (req, res) => {
  const mosqueData = req.body;
  const newMosque = new Mosque(mosqueData);
  try {
    const result = await newMosque.save();
    res.send(result);
  } catch (error) {
    console.error('Error creating mosque:', error);
    res.status(500).send('Error creating mosque');
  }
};

module.exports={getAllMosques,mosqueExistsbyEmail,createMosque}