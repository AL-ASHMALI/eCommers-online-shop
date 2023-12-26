import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-black mb-4'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: 'none' }}
          >
            <div className='d-flex align-items-center justify-content-between'>
              <div style={{ flex: 1 }}>
                <Image src={product.image} alt={product.name} fluid />
              </div>
              <div style={{ flex: 1, marginLeft: '10px' }}>
                <h1 className='text-white'>
                  {product.name} <br></br> £{product.price}
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
