import React from 'react'
import { Link } from "react-router-dom";
import {Card,Row,Col,Figure,Button} from "react-bootstrap";

function FavoriteMoviesList({FavoriteMovies,removeFav,movies}) {

  // console.log(FavoriteMovies, "fav Movies")

  const FavMovies = movies.filter(m => {
    return FavoriteMovies.includes(m._id)
  })
  return (
    <Card className="favmov-inputs">
      <Card.Body>
      <Row>
      <Col xs={12}>
        <h4>Favorite Movies</h4>
      </Col>
    </Row>
    <Row>
      {FavMovies.map((movie) => {
        return (
          <Col key={1} className="fav-movie">

            <Figure>
              <Link to={`/movies/${movie._id}`}>
                <Figure.Image src={movie.ImagePath} alt={movie.Title} />
                <Figure.Caption>{movie.Title}</Figure.Caption>
              </Link>
            </Figure>
            <Button
              className="remove"
              variant="secondary"
              onClick={(e) => removeFav(e,movie._id)}>
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