import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from '../registration-view/RegistrationView';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get("https://viniciustocchio-myflix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

render() {
  const { movies, user } = this.state;

  if (!user) return <Row>
    <Col>
      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    </Col>
  </Row>
  if (movies.length === 0) return <div className="main-view" />;

  return (
    <Router>
      <Row className="main-view justify-content-md-center">
        <Route exact path="/" render={() => {
          return movies.map(m => (
            <Col md={3} key={m._id}>
              <MovieCard movie={m} />
            </Col>
          ))
        }} />
        <Route path="/movies/:movieId" render={({ match }) => {
          return <Col md={8}>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
          </Col>
        }} />

      </Row>
    </Router>
  );
}
}

<Router>
   <div className="main-view">
    <Route exact path="/" render={/* welcome */}/>
    <Route exact path="/movies/:movieId" render={/* movie view */}/>
    <Route exact path="/genres/:name" render={/* genre view*/}/>
    <Route exact path="/directors/:name" render={({ match }) => {
  if (movies.length === 0) return <div className="main-view" />;
  return <Col md={8}>
    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
  </Col>
}
} />
   </div>
</Router>