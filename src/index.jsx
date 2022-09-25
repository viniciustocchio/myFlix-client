import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { creatStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from '.reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// import { createRoot } from 'react-dom/client'; 

const store = creatStore(moviesApp);

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);

// const root = createRoot(container); 
// root.render(< MyFlixApplication />);