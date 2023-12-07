const Announcement = require("../Models/announcementModel");

const getAllAnnouncement=async(req,res)=>{
    try {
      const announcements = await Announcement.find({});
      res.json(announcements);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Error fetching users');
    }
}

const getSelectedAnnouncement=async (req, res) => {
    const date = req.params.date;
    const mosque = await Announcement.find({ date: date });
    res.send(mosque)
}

const deleteAnnouncementById = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the announcement exists
    const announcement = await Announcement.findOne({ _id: id });
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    // Delete the announcement by id
    const result = await Announcement.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Announcement deleted successfully' });
    } else {
      res.status(500).json({ message: 'Failed to delete announcement' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  
  const createAnnouncement = async (req, res) => {
    const announcementData = req.body;
    const newAnnouncement = new Announcement(announcementData);
    try {
      const result = await newAnnouncement.save();
      res.send(result);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Error creating user');
    }
  };


  module.exports={getAllAnnouncement, getSelectedAnnouncement, deleteAnnouncementById, createAnnouncement }