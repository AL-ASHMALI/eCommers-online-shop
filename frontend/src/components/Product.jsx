import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import '../assets/styles/index.css';

const Products = ({ product }) => {
  return (
    <Card className='my-3 custom-card'>
      <Link to={`/product/${product._id}`}>
        <div className='card-image-container'>
          <Card.Img src={product.image} variant='top' className='card-image' />
        </div>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='h3'>£{product.price}</Card.Text>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Products;
