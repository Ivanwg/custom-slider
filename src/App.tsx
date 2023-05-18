import React from 'react';
import 'normalize.css';
import './assets/styles/global.scss';
import Layout from './components/Layout';
import Slider from './components/Slider';

function App() {
  return (
    <div className="App">
      <Layout>
        <Slider />
      </Layout>
    </div>
  );
}

export default App;
