const announcement = require("../Models/announcementModel");


const getAllannouncements=async(req,res)=>{
  try {
    const announcements = await announcements.find({});
    res.json(announcements);
  } catch (err) {
    console.error('Error fetching announcement:', err);
    res.status(500).send('Error fetching announcement');
  }
}

const createannouncement = async (req, res) => {
  const announcementData = req.body;
  const newannouncement = new announcement(announcementData);
  try {
    const result = await newannouncement.save();
    res.send(result);
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).send('Error creating announcement');
  }
};

module.exports={getAllannouncements,createannouncement}