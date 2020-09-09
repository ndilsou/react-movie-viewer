import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {formatDistance} from 'date-fns'

import {Movie, MovieVideo} from '../types'
import VideoModal from './VideoModal'
import {getMovieVideos} from '../services/tmdb/movies'
import { Row, Col } from 'react-bootstrap'

type MovieCardProps = {
  movie: Movie
}


const summarise = (text: string, maxLength: number = 180): string => {
  let summary: string;
  if (text.length <= maxLength) {
    summary = text;
  } else {
    summary = `${text.substr(0, maxLength)}...`
  }
  return summary;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const [text, setText] = useState(summarise(movie.overview));

  useEffect(() => {
    const newText = collapsed ? summarise(movie.overview) : movie.overview;
    setText(newText);
  }, [collapsed, movie.overview])

  const [videos, setVideos] = useState<MovieVideo[]>([])
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = async () => {
    const newVideos = await getMovieVideos(movie);
    setVideos(newVideos);
    setShowModal(true);
  }

  return (
    <>
      <VideoModal
        show={showModal}
        onHide={handleClose}
        videos={videos}
      />
      <Card bg="dark">
          <Row>
            <Col className="pr-0 w-20 h-100">
              <Card.Img
                src={movie.imageUrls.backdrop}
                onClick={handleShow}
              />
            </Col>
            <Col className="pl-0">
              <Card.Body className="text-light">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text className="font-weight-lighter">
                  {text}
                  <br/>
                  {
                    collapsed ?
                      <Button variant="link" className="text-light" onClick={() => setCollapsed(!collapsed)}>Show more</Button> :
                      <Button variant="link" className="text-light" onClick={() => setCollapsed(!collapsed)}>Show less</Button>
                  }
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-light d-flex align-items-end">{`Released ${formatDistance(movie.releaseDate, new Date())} ago`}</Card.Footer>
            </Col>
          </Row>
      </Card>
    </>
  );
}

export default MovieCard
