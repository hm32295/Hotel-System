
import '../PopularChoice/popularChoice.css';
import picads1 from '../../../../../assets/images/picAds1.svg'
import picads2 from '../../../../../assets/images/picAds2.svg'
import picads3 from '../../../../../assets/images/picAds3.svg'
import picads4 from '../../../../../assets/images/picAds4.svg'
const AdsDiscounts = () => {
     const hotels = [
    {
      id: 1,
      name: "Green Park",
      location: "Tangerang, Indonesia",
   image: picads2,
      isPopular: false
    },
    {
      id: 2,
      name: "Poco Wae",
      location: "Malang, Indonesia",
      image: picads1, 
      isPopular: false
    },
    {
      id: 3,
      name: "Silver Rain",
      location: "Bandung, Indonesia",
     image: picads4, 
      isPopular: false
    },
    {
      id: 4,
      name: "Cashville",
      location: "Kemang, Indonesia",
      image:picads3, 
      isPopular: true
    }
  ];

  return (
      <section className="popular-choice-section mt-3">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="section-title">Ads with large living room</h2>
          </div>
        </div>
        
        <div className="row">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="col-lg-3 col-md-6 col-sm-6 col-12">
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
  )
}

export default AdsDiscounts