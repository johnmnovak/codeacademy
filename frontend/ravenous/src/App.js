import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <SearchBar />
        <BusinessList />
      </div>
    );
  }
}

export default App;
