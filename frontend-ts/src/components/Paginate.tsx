import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

type Props = {
  pages?: number;
  page?: number;
  isAdmin?: boolean;
  keyword: string;
  url?: string;
};

const Paginate = ({
  pages = 1,
  page = 1,
  isAdmin = false,
  keyword,
  url = '',
}: Props) => {
  if (pages > 1) {
    return (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `${url}/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    );
  }

  return null;
};

export default Paginate;
