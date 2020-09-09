import React from 'react'
import {Row, Col, Container} from 'react-bootstrap'
import PoweredByImage from './PoweredByImage'

const Footer = () => (
  <footer className="sticky-bottom bg-dark">
    <Container>
      <Row>
        <Col>
          <PoweredByImage/>
        </Col>
        <Col>
          <div className="m-1 text-light">
            Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
)

export default Footer
