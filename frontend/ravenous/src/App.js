import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';

const business = {
    imageSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
    name: 'MarginOtto Pizzeria',
    address: '1010 Paddington Way',
    city: 'Flavortwon',
    state: 'NY',
    zipCode: '10101',
    category: 'Italian',
    rating: 4.5,
    reviewCount: 90
};

/*
const business2 = {
    imageSrc: 'http://www.fedmanwalking.com/sites/default/files/images/PosseEast1002w.jpg',
    name: 'Posse East',
    address: '2900 Duval Street',
    city: 'Austin',
    state: 'TX',
    zipCode: '78705',
    category: 'Barfood',
    rating: 2.7,
    reviewCount: 230
};

const business3 = {
    imageSrc: 'https://img.grouponcdn.com/iam/mEnVM2P9Qz4cg7t632Qn/az-2048x1242/v1/c414x250q85.jpg',
    name: 'Varsity Pizza & Pints',
    address: '3000 Duval Street',
    city: 'Austin',
    state: 'TX',
    zipCode: '78705',
    category: 'Pizza',
    rating: -3,
    reviewCount: 78
}
*/

const businesses = [
    business,
    business,
    business,
    business,
    business,
    business
];

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <h1>ravenous</h1>
        <SearchBar />
        <BusinessList businesses={businesses}/>
      </div>
    );
  }
}

export default App;
