const Mosque = require("../Models/mosqueModel");


const getAllMosques=async(req,res)=>{
  try {
    const mosques = await Mosque.find({});
    res.json(mosques);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Error fetching users');
  }
}
const mosqueExistsbyEmail=async (req, res) => {
  const email = req.params.email;
  const mosque = await Mosque.findOne({ email: email });
  res.json(mosque)
}
const mosqueExistsbyName = async (req, res) => {
  try {
    const name = req.params.name;
    console.log(name)
    const mosque = await Mosque.findOne({ name: name });

    if (mosque) {
      res.send(mosque);
    } else {
      res.status(404).send('Mosque not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
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
const deleteMosqueByName = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the mosque exists
    const mosque = await Mosque.findOne({ id: id });
    if (!mosque) {
      return res.status(404).json({ message: 'Mosque not found' });
    }

    // Delete the mosque by name
    const result = await Mosque.deleteOne({ id: id });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Mosque deleted successfully' });
    } else {
      res.status(500).json({ message: 'Failed to delete mosque' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const mosqueUpdatebyEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const mosque = await Mosque.findOne({ email: email });

    if (!mosque) {
      return res.status(404).json({ error: 'Mosque not found' });
    }

    // Update fields from the JSON data
    if (req.body?.name !== undefined && req.body.name !== '') mosque.name = req.body.name;
    if (req.body?.address !== null && req.body.address !== '') mosque.address = req.body.address;
    if (req.body?.imamName !== undefined && req.body.imamName !== '') mosque.imamName = req.body.imamName;
    if (req.body?.contactNo !== null && req.body.contactNo !== '') mosque.contactNo = req.body.contactNo;
    if (req.body?.description !== undefined && req.body.description !== '') mosque.description = req.body.description;
    if (req.body?.photo[0] !== undefined && req.body.photo[0] !== '') mosque.photo[0] = req.body.photo[0];
    if (req.body?.photo[1] !== undefined && req.body.photo[1] !== '') mosque.photo[1] = req.body.photo[1];
    if (req.body?.photo[2] !== undefined && req.body.photo[2] !== '') mosque.photo[2] = req.body.photo[2];
    
    // Update the photo array with the uploaded file names
    // if (req.file) {
    //   req.files.forEach((file, index) => {
    //     mosque.photo[index] = req.file.path;
    //   });
    // }

    // Save the updated mosque document
    const result = await mosque.save();
    res.json(result);
  } catch (err) {
    console.error('Error updating mosque:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};




module.exports={getAllMosques,deleteMosqueByName,mosqueExistsbyEmail,createMosque,mosqueUpdatebyEmail,mosqueExistsbyName}