
import '../PopularChoice/popularChoice.css';
import picads1 from '../../../../../assets/images/picads1.svg'
import picads2 from '../../../../../assets/images/picads2.svg'
import picads3 from '../../../../../assets/images/picads3.svg'
import picads4 from '../../../../../assets/images/picads4.svg'
const AdsDiscounts = () => {
     const hotels = [
    {
      id: 1,
      name: "PS Wood",
      location: "Depok, Indonesia",
   image: picads2,
      isPopular: false
    },
    {
      id: 2,
      name: "One Five",
      location: "Jakarta, Indonesia",
      image: picads1, 
      isPopular: false
    },
    {
      id: 3,
      name: "Minimal",
      location: "Bogor, Indonesia",
     image: picads4, 
      isPopular: false
    },
    {
      id: 4,
      name: "Stays Home",
      location: "Wonosobo, Indonesia",
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
            <div key={hotel.id} className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div className="hotel-card">
                <div className="hotel-image-container">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="hotel-image"
                  />
                  {hotel.isPopular && (
                    <span className="popular-badge">20% Off</span>
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