import React from "react";
import axios from "axios";
import UserInfo from "./user-info";
import FavoriteMoviesList from "./favorite-movies";
import UserUpdate from "./user-update";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Import React Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";


export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  shouldComponentUpdate() {
    
    return true;
  }

  onRemoveFavorite = (e, movieId) => {
    const username = localStorage.getItem("user");
    console.log(username);
    const token = localStorage.getItem("token");
    console.log(this.props);
    axios
      .delete(
        `https://viniciustocchio-myflix.herokuapp.com/users/${username}/movies/${movieId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert("Movie was removed from favorites.");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  getUser = (token) => {
    const Username = localStorage.getItem("user");
    console.log("log")
    axios
      .get(`https://viniciustocchio-myflix.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response,"user info in profile com")
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavouriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

editUser = (e,user) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log(user,"user form fav movie to be edit it ")
    let notEmpty=true;
for (const key in user) {
if(!user[key]){
notEmpty=false
}
  }

if(notEmpty){
axios
      .put(
        `https://viniciustocchio-myflix.herokuapp.com/users/${Username}`,
        {
          username: user.Username,
          password: user.Password,
          email: user.Email,
          birthday: user.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
               
        const data = response.data;
        console.log(data);
        alert("Profile is updated!");
        localStorage.setItem("user",user.Username)
        window.open(`/users/${user.Username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
}else{
  alert("fill all the form field")
}
    
  };
  render() {
    const { movies } = this.props;
    const { FavoriteMovies, Username, Email, Birthday, Password } = this.state;
// console.log(FavoriteMovies, "fav movies in the profile view")
    return (
      <Container>
        <UserInfo name={Username} email={Email}/>
        <FavoriteMoviesList FavoriteMovies={FavoriteMovies} movies={movies} removeFav={this.onRemoveFavorite} />
        <Row>
          <Col>
            <Card className="user-profile">
              <Card.Header>User Profile</Card.Header>
              <Card.Body>
             
              </Card.Body>
            </Card>
          </Col>

          <UserUpdate editUser={this.editUser} />
    
        </Row>
      </Container>
    );
  }
}
