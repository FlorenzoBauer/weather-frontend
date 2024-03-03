import './NotFound.css';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
const navigate = useNavigate()

const handleClick = () => {
  navigate('./')
}

  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 - Not Found</h1>
      <p className="not-found-text">The page you're looking for does not exist.</p>
      <button className='home-btn' onClick={handleClick}>Return Home</button>
    </div>
  );
};

export default NotFound;
