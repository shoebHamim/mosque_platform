
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';




const News = ({ mosque_email,hasEditAccess }) => {
  
  console.log(hasEditAccess);
  


  

  const [news, setNews] = useState([]);
  // mosque_email = useParams().email
  const [newNews, setNewNews] = useState({
    title: '',
    content: '',
  });


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/news/${mosque_email}`);
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
      newNews.email = mosque_email
      console.log(newNews);
      const response = await axios.post('http://localhost:5000/news', newNews);
      setNews((prevNews) => [response.data, ...prevNews]);
      setNewNews({ title: '', content: '' });
      // setSuccessMessage('News successfully published!');
      toast.success('News successfully published!')
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
      const updatedNewsResponse = await axios.get(`http://localhost:5000/news/${mosque_email}`);
      setNews(updatedNewsResponse.data);

      toast.success('News successfully updated!')

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
      toast.success('Announcement Deleted')
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  return (
    <div className="mx-28">{hasEditAccess?
      <>
      <h2 className='text-center font-bold text-xl mt-6'>Publish Important Announcements of your Mosque </h2>
      <div className='flex justify-center my-6' >
        <form onSubmit={createNews} >
          <input name='title' required 
            onChange={handleInputChange} type="text" placeholder="Tittle" className="input input-bordered input-primary w-full " />
          <textarea name='content' 
            onChange={handleInputChange}
            required placeholder="Give Details" className=" mt-4 h-24 input input-bordered input-info w-full " />

          <button className='text-center mx-auto block btn btn-primary' type="submit">Publish</button>

        </form>
      </div>
      </>
    : <p className='text-center font-bold text-xl mt-6'>Announcements </p>}

      <div className='mt-8'>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {news.map((singleNews) => (

            <div key={singleNews._id} className="card  bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{singleNews.title}</h2>
                <p>{singleNews.content}</p>
                {hasEditAccess&&
                <div className="card-actions justify-end">
                  <button className="btn  btn-sm" onClick={() => updateNews(singleNews._id)}>Update</button>
                  <button className="btn btn-error btn-sm" onClick={() => deleteNews(singleNews._id)}>Delete</button>
                </div>
                }
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default News;

