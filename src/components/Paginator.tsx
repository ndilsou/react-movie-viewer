import React from 'react'
import { Pagination } from 'react-bootstrap'

type PaginatorProps = {
  activePage: number,
  onPaginationClick: (i: number) => void
}

const Paginator = ({activePage, onPaginationClick}: PaginatorProps) => {
  let start, end: number;
  if (activePage <= 2) {
    start = 1
    end = 5
  } else {
    start = activePage - 2
    end = activePage + 2
  }

  let items: JSX.Element[] = []
  for (let i = start; i <= end; ++i) {
    const isActive = i === activePage
    items.push(
      <Pagination.Item key={`page-${i}`} onClick={() => onPaginationClick(i)} active={isActive}>{i}</Pagination.Item>
    )
  }

  return (
      <Pagination>
        <Pagination.First onClick={() => onPaginationClick(1)}/>
        <Pagination.Prev onClick={() => onPaginationClick(activePage - 1)}/>
        {items}
        <Pagination.Next onClick={() => onPaginationClick(activePage + 1)}/>
      </Pagination>
    )
}

export default Paginator
