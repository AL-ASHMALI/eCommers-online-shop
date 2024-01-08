import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const SearchBox = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const location = useLocation();

  const [keyword, setKeyword] = useState(urlKeyword || '');
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    if (isAdmin) {
      if (location.pathname.includes('/admin/productlist')) {
        setPlaceholder('Search Products...');
      } else if (location.pathname.includes('/admin/userlist')) {
        setPlaceholder('Search Users...');
      }
    } else {
      setPlaceholder('Search...');
    }
  }, [isAdmin, location.pathname]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword('');
      let linkPath = '';
      if (isAdmin && location.pathname.includes('/admin/productlist')) {
        linkPath = `/admin/productlist/search/${keyword}`;
      } else if (isAdmin && location.pathname.includes('/admin/userlist')) {
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
        placeholder={placeholder}
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        className='mr-sm-2 ml-sm-5'
      />
      <Button type='submit' variant='success' className='p-2 mx-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
