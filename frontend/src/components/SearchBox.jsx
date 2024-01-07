import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const SearchBox = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || '');

  const currentPath = window.location.pathname;
  let linkPath = '';

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword('');
      if (isAdmin && currentPath.includes('/admin/productlist')) {
        linkPath = `/admin/productlist/search/${keyword}`;
      } else if (isAdmin && currentPath.includes('/admin/userlist')) {
        linkPath = `/admin/userlist/search/${keyword}`;
      } else if (!isAdmin) {
        linkPath = `/search/${keyword}`;
      }
      navigate(linkPath);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        placeholder='Search Products... '
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>

      <Button type='submit' variant='success' className='p-2 mx-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
