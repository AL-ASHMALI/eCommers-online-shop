import { LinkContainer } from 'react-router-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import Paginate from '../../components/Paginate';
import Meta from '../../components/Meta';
import SearchBox from '../../components/SearchBox';

const ProductListScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product')) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success('Product deleted successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Meta title='Products List' />
      <Row>
        {keyword && (
          <Col>
            <Link to='/admin/productlist' className='btn btn-success mb-4'>
              {' '}
              Go Back
            </Link>
          </Col>
        )}
        <Col>
          <SearchBox isAdmin={true} />
        </Col>
      </Row>

      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Button className='btn-sm m-3 ' onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <Table
            striped
            hover
            responsive
            className='table-lg'
            variant='dark'
            bordered
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>£{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Col
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Paginate pages={data.pages} page={data.page} isAdmin={true} />
          </Col>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
