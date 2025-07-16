import React from 'react';
import './popularChoice.css';
import piccvg from '../../../../../assets/images/picsvg.svg'
import pic1 from '../../../../../assets/images/pic (1).png'
import pic2 from '../../../../../assets/images/pic (2).png'
import pic3 from '../../../../../assets/images/pic.png'





const PopularChoice = () => {
  const hotels = [
    {
      id: 1,
      name: "Green Park",
      location: "Tangerang, Indonesia",
      image: piccvg,
      isPopular: false
    },
    {
      id: 2,
      name: "Poco Wae",
      location: "Malang, Indonesia",
      image: pic1, 
      isPopular: false
    },
    {
      id: 3,
      name: "Silver Rain",
      location: "Bandung, Indonesia",
      image: pic2, 
      isPopular: false
    },
    {
      id: 4,
      name: "Cashville",
      location: "Kemang, Indonesia",
      image:pic3, 
      isPopular: true
    }
  ];

  return (
    <section className="popular-choice-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="section-title">Hotels with large living room</h2>
          </div>
        </div>
        
        <div className="row">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="cardaya col-lg-3 col-md-6 col-sm-6 col-6">
              <div className="hotel-card">
                <div className="hotel-image-container">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="hotel-image"
                  />
                  {hotel.isPopular && (
                    <span className="popular-badge">Popular Choice</span>
                  )}
                </div>
                <div className="hotel-info">
                  <h3 className="hotel-name">{hotel.name}</h3>
                  <p className="hotel-location">{hotel.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularChoice;