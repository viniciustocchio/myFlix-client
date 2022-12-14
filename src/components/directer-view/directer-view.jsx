import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';

export class DirectorView extends React.Component {

    render() {
        const { director, movies, onBackClick } = this.props;
        let directorMovies=movies.filter(movie=>movie.Director.Name==director.Name)


        return (
            <div> 
                <Card className="director-view">
                    <Card.Header className="director-view-header">Director</Card.Header>
                    <Card.Body className="director-view-title">
                        <h3>{director.Name}</h3>
                        </Card.Body>
                    <Card.Body>
                        <b>Born:</b><br /> 
                      
                        {director.Born}
                        </Card.Body>
                    <Card.Body>
                        <b>Bio:</b> <br />
                        {director.Bio}
                        </Card.Body>
                        <h2 className="subtitle">DIRECTED MOVIES: </h2>
                        <Card.Body>{console.log(directorMovies,director,movies,"director movies")}
          {directorMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie}>
              {movie.title}
            </MovieCard>
          ))}
        </Card.Body>
                    <Card.Footer>
                        <Button
                            className="dir-view-button"
                            onClick={() => {
                                onBackClick();
                            }}
                            >
                                Back
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

// DirectorView.proptypes = {
//   Director: PropTypes.shape({
//     Name: PropTypes.string.isRequired,
//     Bio: PropTypes.string,
//     Birth: PropTypes.number,
//   }).isRequired,
// };