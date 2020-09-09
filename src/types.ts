export type Movie = {
  title: string,
  overview: string,
  imageUrls: {
    backdrop: string
    poster: string
  }
  // backdropImageUrl: string,
  // posterImageUrl: string,
  releaseDate: Date,
  id: string
}

export type MovieVideo = {
  key: string,
  name: string,
  site: string,
  size: MovieVideoSize,
  type: MovieVideoType,
  url: string
}

export type MovieVideoSize = 360 | 480 | 720 | 1080
export type MovieVideoType = 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Behind the Scenes' | 'Bloopers'
