import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Row, Col } from 'antd';
import './App.css';
import "antd/dist/antd.css";
import client from './apolloClient';
import Wallets from './components/Wallets/Wallets';
import Exchanges from './components/Exchanges/Exchanges';


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
          <div style={{ display: 'inline-grid', width: '100%' }}>
            <Row>
              <Col lg={12} style={{ alignSelf: 'center' }}>
                <h2 style={{ textAlign: 'start', color: '#1890ff', marginLeft: '5%' }}>{'Digital Wallet Dashboard'}</h2>
              </Col>
              <Col lg={12}>
                <Exchanges />
              </Col>
            </Row>
            <Wallets />
          </div>
      </div>
    </ApolloProvider>
    
  );
}

export default App;
