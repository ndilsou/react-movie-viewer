import React from 'react'
import {Modal} from 'react-bootstrap';
import {MovieVideo} from 'types';
import VideoIframe, {AspectRatio} from './VideoIframe';

type VideoModalProps = {
  show: boolean
  onHide: () => void
  videos: MovieVideo[]
}
const VideoModal = ({show, onHide, videos}: VideoModalProps) => {

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title>Modal heading</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        {
          videos.length > 0 ?
            <VideoIframe
              src={videos[0].url}
              title={videos[0].name}
              aspectRatio={AspectRatio.SixteenByNine}
              allowFullScreen
            />
            : "No Video available"
        }
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  )
}

export default VideoModal;
