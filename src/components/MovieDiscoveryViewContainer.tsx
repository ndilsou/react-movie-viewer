import React, {useState, useEffect} from 'react'

import {Movie} from '../types';
import * as tmdb from '../services/tmdb';
import MovieDiscoveryView from './MovieDiscoveryView';
import {useRouteMatch, useHistory, match as Match} from 'react-router-dom';

type MatchParams = { page?: string | undefined };


const MovieDiscoveryViewContainer = () => {
  const match = useRouteMatch<MatchParams>()
  const routePage = getRoutePage(match)
  const [page, setPage] = useState(routePage);

  const history = useHistory();
  const setRoutePage = (page: number) => {
    let path: string;
    if (match.path.indexOf(':page') !== -1) {
      path = match.path.replace(':page', page.toString());
    } else {
      path = `${match.path}/${page}`
    }
    history.push(path);
    setPage(page);
    window.scrollTo(0, 0);
  }

  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await tmdb.discoverMovies({page});
      setMovies(movies);
    };
    fetchMovies();
  })

  return (
    <MovieDiscoveryView movies={movies} activePage={page} onPaginationClick={(i) => setRoutePage(i)}/>
  )
}

const getRoutePage = (match: Match<MatchParams>): number => {
  let routePage: number;
  if (match.params.page) {
    routePage = Number.parseInt(match.params.page)
  } else {
    routePage = 1
  }
  return routePage;
}

export default MovieDiscoveryViewContainer;

