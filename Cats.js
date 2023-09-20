import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cats.css';

function Cats() {
  const [catImages, setCatImages] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [breeds, setBreeds] = useState([]);
  const apiKey = 'Insert API KEY here';

  useEffect(() => {
    axios
      .get('https://api.thecatapi.com/v1/breeds', {
        headers: {
          'x-api-key': apiKey,
        },
      })
      .then((response) => {
        const breedNames = response.data.map((breed) => breed.name);
        setBreeds(breedNames);
      })
      .catch((error) => {
        console.error('Error fetching cat breeds:', error);
      });
  }, [apiKey]);

  useEffect(() => {
    let apiUrl = 'https://api.thecatapi.com/v1/images/search';

    if (selectedBreed) {
      const formattedBreed = selectedBreed.substring(0, 4).toLowerCase();
      apiUrl += `?breed_ids=${formattedBreed}`;
    }

    axios
      .get(apiUrl, {
        headers: {
          'x-api-key': apiKey,
        },
      })
      .then((response) => {
        const images = response.data.map((cat) => cat.url);
        if (images.length === 0) {
          console.warn('No cat images found for the selected breed.');
        }
        setCatImages(images);
      })
      .catch((error) => {
        console.error('Error fetching cat images:', error);
        setCatImages([]);
      });
  }, [selectedBreed, apiKey]);

  return (
    <div className="Cats">
      <br></br>
      <h2>Filter Pictures Of Cats</h2>

      <div className="BreedFilter">
        <label htmlFor="breedSelect">Select Breed: </label>
        <select
          id="breedSelect"
          value={selectedBreed}
          onChange={(e) => {
            const selectedValue = e.target.value;
            setSelectedBreed(selectedValue);
          }}
        >
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      <div className="CatImages">
        {catImages.map((image, index) => (
          <img key={index} src={image} alt={`Cat ${index}`} />
        ))}
      </div>
    </div>
  );
}

export default Cats;
