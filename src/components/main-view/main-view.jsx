import React from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import axios from "axios";
import {Container, Row, Col} from "react-bootstrap";
import {NavBar} from "../navbar/navbar";
import {LoginView} from "../login-view/login-view";
// import { MovieCard } from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import {RegistrationView} from "../registration-view/registration-view";
import {DirectorView} from "../directer-view/directer-view";
import {GenreView} from "../genre-view/genre-view";
import {ProfileView} from "../profile-view/profile-view";
import {UserUpdate} from "../profile-view/profile-view";
import {connect} from 'react-redux';
import {setMovies} from '../../actions/actions';
import MoviesList from '../movies-list/movies-list'

class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            movies: [],
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token");
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem("user"),
                movies : []
            });

            this.getMovies(accessToken);
        }
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState(() => {
            return {
                user: authData.user.Username,
            }
        });

        localStorage.setItem("token", authData.token);
        localStorage.setItem("user", authData.user.Username);
        this.getMovies(authData.token);
    }

    getMovies(token) {
        axios.get("https://viniciustocchio-myflix.herokuapp.com/movies", {
                headers: {Authorization: `Bearer ${token}`},
            })
            .then((response) => {

              this.setState(
                    {movies: response.data}
               );
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let {movies} = this.state;
        let {user} = this.state;

        return (
            <Router>
                <NavBar user={user}/>
                <Container>
                <Row className="main-view justify-content-md-center">
                    <Route
                        exact
                        path="/"
                        render={() => {

                            if (user === null) {
                                return <Col><LoginView
                                    onLoggedIn={user => this.onLoggedIn(user)}
                                />
                                </Col>;
                            }

                            if (movies.length === 0) {
                                return <div className="main-view">
                                    <h2>
                                        No movies found
                                    </h2>
                                </div>;
                            } else {
                    return <MoviesList movies={movies} visibilityFilter='ste'/>;
                            }

                        }}/>
                    {/* return movies.map((m) => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ));
              }}
            /> */}
                    <Route
                        path="/register"
                        render={() => {
                            if (user) return <Redirect to="/"/>;
                            return (
                                <Col lg={8} md={8}>
                                    <RegistrationView/>
                                </Col>
                            );
                        }}
                    />
                    <Route
                        path="/movies/:id"
                        render={({match, history}) => {
                            return (
                                <Col md={8}>
                                    <MovieView


                                        movie={movies.find((m) => m._id === match.params.id)}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />
                    <Route path="/directors/:name" render={({match, history}) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                        </Col>
                        if (movies.length === 0) return <div className="main-view"/>;
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}
                                          movies={movies} onBackClick={() => history.goBack()}/>
                        </Col>
                    }
                    }/>

                    <Route path="/genres/:name" render={({match, history}) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                        </Col>
                        if (movies.length === 0) return <div className="main-view"/>;
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                                       onBackClick={() => history.goBack()} movies={movies}/>
                        </Col>
                    }}/>
                    <Route
                        path={`/users/${user}`}
                        render={({match, history}) => {
                            if (!user) return <Redirect to="/"/>;
                            return (
                                <Col>
                                    <ProfileView
                                        movies={movies}
                                        user={user}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />
                    <Route
                        path={`/user-update/${user}`}
                        render={({match, history}) => {
                            if (!user) return <Redirect to="/"/>;
                            return (
                                <Col>
                                    <UserUpdate
                                        user={user}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />


                </Row>
                </Container>
            </Router>
        );
    }
}

let mapStateToProps = state => {
    return {movies: state.movies}
}

export default connect(mapStateToProps, {setMovies})(MainView);