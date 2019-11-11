import React from 'react';
import { Grommet } from 'grommet';
import Theme from './styles/Theme';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Header from './components/Layout/Header';
import Content from './components/Layout/Content';

const uri = process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:8080';
const client = new ApolloClient({ uri });

function App() {
    return (
        <ApolloProvider client={ client }>
            <Grommet theme={ Theme }>
                <div className='App'>
                    <Header/>
                    <Content/>
                </div>
            </Grommet>
        </ApolloProvider>
    );
}

export default App;
