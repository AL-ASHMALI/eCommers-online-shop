import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const currentPath = window.location.pathname; // Get the current URL path

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((y) => {
          let linkPath = '';

          if (isAdmin) {
            if (currentPath.includes('/admin/productlist')) {
              linkPath = `/admin/productlist/${y + 1}`;
            } else if (currentPath.includes('/admin/userlist')) {
              linkPath = `/admin/userlist/${y + 1}`;
            } else if (currentPath.includes('/admin/orderlist')) {
              linkPath = `/admin/orderlist/${y + 1}`;
            }
          } else {
            linkPath = keyword
              ? `/search/${keyword}/page/${y + 1}`
              : `/page/${y + 1}`;
          }

          return (
            linkPath && (
              <LinkContainer key={y + 1} to={linkPath}>
                <Pagination.Item active={y + 1 === page}>
                  {y + 1}
                </Pagination.Item>
              </LinkContainer>
            )
          );
        })}
      </Pagination>
    )
  );
};

export default Paginate;
