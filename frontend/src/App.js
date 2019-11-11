import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Header from './components/Layout/Header';
import Content from './components/Layout/Content';

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URL,
});

function App() {
    return (
        <ApolloProvider client={ client }>
            <div className='App'>
                <Header/>
                <Content/>
            </div>
        </ApolloProvider>
    );
}

export default App;
