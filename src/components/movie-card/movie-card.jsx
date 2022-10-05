import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  addFav = (movieId) => {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem("user");
    axios.post(`https://viniciustocchio-myflix.herokuapp.com/users/${username}/movies/${movieId}`,{},
        {
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` },
        }
          )
        .then(() => {
          alert('Movie added to favorites')
          console.log(`Movie added to ${username} Favorite movies`);
        })
        .catch((err) => {
          console.log(err);
        });
        } ;
        
  render() {
     const { movie } = this.props;
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button  variant="link">Open</Button>
          </Link>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
              
          <Button onClick={() => {this.addFav(movie._id);}}> add to fav </Button>

        </Card.Body>
      </Card>
    );
  }
}