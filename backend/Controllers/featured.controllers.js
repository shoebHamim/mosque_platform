const Featured = require("../Models/featuredModel");


const getAllFeatured=async(req,res)=>{
  try {
    const mosques = await Featured.find({});
    res.json(mosques);
  } catch (err) {
    console.error('Error fetching featured:', err);
    res.status(500).send('Error fetching featured');
  }
}
const getOneFeatured = async (req, res) => {
  try {
    const mosque = await Featured.findById(req.params.id);
    if (!mosque) {
      return res.status(404).send('No mosque found with this ID');
    }
    res.json(mosque);
  } catch (err) {
    console.error('Error fetching mosque:', err);
    res.status(500).send('Error fetching mosque');
  }
};

module.exports={getAllFeatured,getOneFeatured}