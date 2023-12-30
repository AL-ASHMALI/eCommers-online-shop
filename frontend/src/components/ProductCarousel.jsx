import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import '../assets/styles/index.css';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='custom-carousel'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: 'none' }}
          >
            <div className='carousel-item-container'>
              <div className='carousel-item-image'>
                <Image src={product.image} alt={product.name} fluid />
              </div>
              <div className='carousel-item-details'>
                <h1 className='text-white'>
                  {product.name} <br /> £{product.price}
                </h1>
                <h5 className='text-white'>{product.description}</h5>
              </div>
            </div>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
