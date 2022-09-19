import React from 'react'
import { Link } from "react-router-dom";
import {Card,Row,Col} from "react-bootstrap";

function FavoriteMoviesList({FavoriteMovies,removeFav}) {
  return (
    <Card className="favmov-inputs">
      <Card.Body>
      <Row>
      <Col xs={12}>
        <h4>Favorite Movies</h4>
      </Col>
    </Row>
    <Row>
      {FavoriteMovies.map((ImagePath, Title, _id) => {
        return (
          <Col key={_id} className="fav-movie">
            <Figure>
              <Link to={`/movies/${movie._id}`}>
                <Figure.Image src={ImagePath} alt={Title} />
                <Figure.Caption>{Title}</Figure.Caption>
              </Link>
            </Figure>
            <Button
              className="remove"
              variant="secondary"
              onClick={() => removeFav(movie._id)}>
              Remove from the list
            </Button>
          </Col>
        );
      })}
    </Row>
  </Card.Body>
  </Card> 
  
  )
}

export default FavoriteMoviesList