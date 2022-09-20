import React from 'react';
import PropTypes from 'prop-types';

import { Button, Container, Card } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';



export class GenreView extends React.Component {

    render() {
        const { genre, movies, onBackClick, } = this.props;
         const genreMovies=movies.filter(movie=>movie.Genre.Name==genre.Name)

        return (
            
            <Container>
                <Card className="genre-view">
                    <Card.Header className="genre-view-header">Genre</Card.Header>
                    <Card.Body className="genre-view-title">
                        <b>{genre.Name}</b>
                        </Card.Body>
                    <Card.Body>
                        {genre.Description}
                        </Card.Body>
                     
                    <Card.Footer>
                        <Button
                            className="genre-view-button"
                            onClick={() => {
                            onBackClick();
                            }}
                            >
                                Back
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
        );
    }
}

GenreView.proptypes = {
    Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
};