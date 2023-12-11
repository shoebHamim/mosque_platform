// controllers/newsController.js
const News = require('../Models/newsModel');

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getNews = async (req, res) => {
  const email=req.params.email

  try {
    const news = await News.find({ email: email }).sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createNews = async (req, res) => {
  const { title, content,email } = req.body;
  const news = new News({ title, content,email });

  try {
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedNews = await News.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.json(updatedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteNews = async (req, res) => {

  const { id } = req.params;
  try {
    await News.findByIdAndDelete(id);
    res.json({ message: 'News deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
