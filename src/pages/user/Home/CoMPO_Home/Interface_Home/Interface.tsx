import  { useContext, useState } from 'react';
import { format } from 'date-fns';
import banner from '../../../../../assets/images/banner.svg';
import './interface.css';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import FreeCancellationIcon from '@mui/icons-material/FreeCancellation';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../../context/context';
const Interface = () => {
  const{loginData} = useContext(AuthContext)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [capacity, setCapacity] = useState(1);

  const increment = () => setCapacity((prev) => prev + 1);
  const decrement = () => setCapacity((prev) => Math.max(1, prev - 1));

  const formatDateRange = () => {
    
    if (startDate && endDate) {
      const from = format(new Date(startDate), 'dd MMM');
      const to = format(new Date(endDate), 'dd MMM');
      return `${from} - ${to}`;
    } else if (startDate) {
      return format(new Date(startDate), 'dd MMM yyyy');
    }
    return 'Select dates';
  };
  let Navigate=useNavigate()
  let {setBookingData}=useContext(AuthContext)
  let EXPLORE=()=>{
    
   setBookingData({ startDate, endDate, capacity });
   Navigate('/MasterUser/Explore_USER')
  }
  return (
    <div className="vacation-booking">
      <div className="container">
        <div className="row gap-5">
          {/* Left Content */}
          {loginData?.role || localStorage.getItem('token')?(

              <div className="col-12 col-lg-6 order-2 order-lg-1 booking-card">
                <h3 className="mb-4 TYTLE_Interface">
                  Forget Busy Work,<br />
                  <span className="">Start Next Vacation</span>
                </h3>
                <p className="interface_p mb-4">
                  We provide what you need to enjoy your holiday with family. Time to make another memorable moments.
                </p>
                <div className=" booking-card">
                  <div className="card-body">
                    <h6 className="card-title">Start Booking</h6>
                    <p className="card-text text-muted">Pick a Date</p>
                    <button
                      className="btn BTN-Changes w-100 mb-3"
                      data-bs-toggle="collapse"
                      data-bs-target="#dateCollapse"
                    >
                    <FreeCancellationIcon/>{formatDateRange()}
                    </button>
                    <div className="collapse" id="dateCollapse">
                      <div className="p-3">
                        <div className="mb-3">
                          <label htmlFor="start-date" className="form-label custom-label">Start Date</label>
                          <input
                            type="date"
                            className="form-control"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="end-date" className="form-label custom-label">End Date</label>
                          <input
                            type="date"
                            className="form-control"
                            id="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="card-text text-muted">Capacity</p>
                    <div className="d-flex align-items-center mb-3 capacity-control">
                      <button className="btn dAnGer_decrement me-2" onClick={decrement}>
                      <PersonRemoveIcon/>
                      </button>
                      <span className="capacity-text">
                        {capacity} {capacity !== 1 ? 'persons' : 'person'}
                      </span>
                      <button className="btn SucceSS-Increment ms-2" onClick={increment}>
                    <PersonAddAltIcon/>
                      </button>
                    </div>
                    <button className="btn  btn-lg btn-explore w-100" onClick={EXPLORE}>Explore</button>
                  </div>
                </div>
              </div>
          ):null}
          {/* Right Image */}
          <div className="col-12 col-lg-6 order-1 order-lg-2">
            <img src={banner} alt="Modern vacation home" className="img-fluid rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interface