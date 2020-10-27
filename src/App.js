import React from 'react';

// import { Router, Route, Switch } from 'react-router';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PostsContainer from './containers/PostsContainer';
import PostContainer from './containers/PostContainer';

const history =  createBrowserHistory();

//here will be the routes
function App() {
    return (
        <>
            <Router history={history}>
                <div className='bg-green-500 text-white px-4 py-6 text-xl font-bold'><Link to={'/'}>Home </Link> </div>
                <Switch>
                    <Route exact path="/posts/:id" component={routerProps => (<PostContainer {...routerProps} />)} />
                    <Route path="/" component={PostsContainer} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
