import { useState } from 'react';
import APIForm from './components/APIForm';
import Gallery from './components/Gallery';
import './App.css';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [inputs, setInputs] = useState({
    url: '',
    format: '',
    no_ads: '',
    no_cookie_banners: '',
    width: '',
    height: '',
  });
  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState([]);

  const submitForm = async () => {
    if (!inputs.url) {
      alert('Please enter a URL.');
      return;
    }

    const defaultValues = {
      format: 'jpeg',
      no_ads: 'true',
      no_cookie_banners: 'true',
      width: '1920',
      height: '1080',
    };

    for (const [key, value] of Object.entries(inputs)) {
      if (value === '') {
        inputs[key] = defaultValues[key];
      }
    }

    const query = makeQuery();
    await callAPI(query);
  };

  const makeQuery = () => {
    const wait_until = 'page_loaded';
    const fullURL = `https://${inputs.url}`;

    return `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}`;
  };

  const callAPI = async (query) => {
    try {
      const response = await fetch(query);
      const json = await response.json();

      if (json.url) {
        setCurrentImage(json.url);
        setPrevImages((images) => [...images, json.url]);
      } else {
        alert('Failed to fetch screenshot.');
      }
    } catch (error) {
      console.error('API Call Error:', error);
    }
  };

  return (
    <div className="center-wrapper">
      <div className="whole-page">
        <h1>Build Your Own Screenshot! 📸</h1>
        <APIForm
          inputs={inputs}
          handleChange={(e) =>
            setInputs((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value.trim(),
            }))
          }
          onSubmit={submitForm}
        />
        <br />
        <div>
          {currentImage ? (
            <img className="screenshot" src={currentImage} alt="Screenshot returned" />
          ) : (
            <div>No Screenshot Available</div>
          )}
        </div>
        <Gallery images={prevImages} />
      </div>
    </div>
  );
  
}

export default App;
