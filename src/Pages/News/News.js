// News.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './News.css'; // Import the CSS file

const News = () => {
  const [news, setNews] = useState([]);
  const [newNews, setNewNews] = useState({
    title: '',
    content: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNews((prevNews) => ({
      ...prevNews,
      [name]: value,
    }));
  };

  const createNews = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/news', newNews);
      setNews((prevNews) => [response.data, ...prevNews]);
      setNewNews({ title: '', content: '' });
      setSuccessMessage('News successfully published!');
    } catch (error) {
      console.error('Error creating news:', error);
    }
  };

  const updateNews = async (id) => {
    try {
      // Fetch the specific news item by ID
      const response = await axios.get(`http://localhost:5000/news/${id}`);
      const existingNews = response.data;

      // Set the existing news data to the input fields for editing
      setNewNews({
        title: existingNews.title,
        content: existingNews.content,
      });

      // Implement the logic to update the news in the database
      await axios.put(`http://localhost:5000/news/${id}`, newNews);

      // Fetch the updated news list and set it to the state
      const updatedNewsResponse = await axios.get('http://localhost:5000/news');
      setNews(updatedNewsResponse.data);

      setSuccessMessage('News successfully updated!');
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  const deleteNews = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/news/${id}`);
      setNews((prevNews) =>
        prevNews.filter((singleNews) => singleNews._id !== id)
      );
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  return (
    <div className="news-container">
      <h2>Publish the Important Announcements of your Mosque </h2>
      <form onSubmit={createNews}>
        <label>
          Topic:
          <input
            type="text"
            name="title"
            value={newNews.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Special Notice:
          <textarea
            name="content"
            value={newNews.content}
            onChange={handleInputChange}
            required
          ></textarea>
        </label>
        <button type="submit">Publish</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <ul>
        {news.map((singleNews) => (
          <li key={singleNews._id} className="news-item">
            <strong>Topic: {singleNews.title}</strong>
            <p>Special Notice: {singleNews.content}</p>
            <div className="button-container">
              <button className="update-button" onClick={() => updateNews(singleNews._id)}>
                Update
              </button>
              <button className="delete-button" onClick={() => deleteNews(singleNews._id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;

