import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';



import { createRoot } from 'react-dom/client';



// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container><MainView /></Container>
    );
  }
}


const container = document.getElementsByClassName('app-container')[1];

const root = createRoot(container); 
root.render(< MyFlixApplication />);