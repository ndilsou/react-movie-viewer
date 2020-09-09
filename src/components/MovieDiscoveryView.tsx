import React from 'react'
import Container from 'react-bootstrap/Container';
/* import CardColumns from 'react-bootstrap/CardColumns'; */
import {Row} from 'react-bootstrap';

import {Movie} from '../types';
import MovieCard from './MovieCard';
import Paginator from 'components/Paginator';

type CardListProps = {
  movies: Array<Movie>,
  activePage: number,
  onPaginationClick: (i: number) => void
}

const MovieDiscoveryView = ({movies, activePage, onPaginationClick}: CardListProps) => (
  <Container className="my-1">
    <Row>
      {movies.map((movie: Movie) => (<MovieCard className="col-lg-4 col-sm-6 p-1" key={movie.id} movie={movie} />))}
    </Row>
    <Row className="justify-content-center">
      <Paginator activePage={activePage} onPaginationClick={onPaginationClick}/>
    </Row>
  </Container>
);

export default MovieDiscoveryView

