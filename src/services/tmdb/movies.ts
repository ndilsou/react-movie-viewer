import {parseISO} from "date-fns";

import{API_BASE_URL, API_KEY, IMAGE_BASE_URL} from './constant'
import {Movie, MovieVideo, MovieVideoSize, MovieVideoType} from "types";


export const getRequest = async (route: string, params?: object): Promise<Response> => {
  const query: object = {api_key: API_KEY, ...params};
  const queryString = Object.entries(query).map(([key, value]: [string, any]) => `${key}=${value}`)
    .reduce((acc: string, val: string, i: number) => i !== 0 ? `${acc}&${val}` : val.toString());
  const url = `${API_BASE_URL}${route}?${queryString}`;
  return await fetch(url);
}


type DiscoverQueryParams = {
  language?: string,
  region?: string,
  sort_by?: string,
  page?: number,
  release_date?: string
}


export const discoverMovies = async (params?: DiscoverQueryParams): Promise<Movie[]> => {
  const response = await getRequest('/discover/movie', params);
  if (!response.ok) {
    return [];
  }

  const content = await response.json()
  return content.results.map(parseMovie)
}


export const getMoviesPlayingNow = async (): Promise<Movie[]> => {
  const response = await getRequest('/movie/now_playing');
  if (!response.ok) {
    return [];
  }

  const content = await response.json()
  return content.results.map(parseMovie)
}


export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await getRequest('/movie/popular');
  if (!response.ok) {
    return [];
  }

  const content = await response.json()
  return content.results.map(parseMovie)
}


type RawMovieVideo = {
  id: string,
  key: string,
  name: string,
  site: string,
  size: MovieVideoSize,
  type: MovieVideoType,
}


export const getMovieVideos = async ({id: movieId}: Movie): Promise<MovieVideo[]> => {
  const response = await getRequest(`/movie/${movieId}/videos`);
  if (!response.ok) {
    return [];
  }

  const content = await response.json()
  return content.results.map(({id, key, name, site, size, type}: RawMovieVideo): MovieVideo | null => {
    const url = formatVideoUrl(key, site);
    if (url) {
      return {
        key,
        name,
        site,
        size,
        type,
        url
      }
    } else {
      console.log(`${site} is not supported for video ${id} of movie ${movieId}`)
      return null
    }
  })
  .filter(Boolean);
}

const formatVideoUrl = (key: string, site: string): string | null => {
  let url: string | null;
  switch (site) {
    case 'YouTube':
      url = `https://www.youtube.com/embed/${key}`;
      break;
    case 'Vimeo':
      url = `https://vimeo.com/embed/${key}`;
      break;
    default:
      url = null;
  }
  return url;

}

type RawMovie = {
  title: string,
  overview: string,
  poster_path: string,
  backdrop_path: string,
  release_date: string,
  id: string
}


const parseMovie = ({title, overview, poster_path, backdrop_path, release_date, id}: RawMovie): Movie => ({
    title,
    overview,
    imageUrls: {
      backdrop: `${IMAGE_BASE_URL}${backdrop_path}`,
      poster: `${IMAGE_BASE_URL}${poster_path}`,
    },
    releaseDate: parseISO(release_date),
    id
  })


