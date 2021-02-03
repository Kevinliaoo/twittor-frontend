import React from 'react'; 
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} /> 
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/editprofile" component={EditProfile} />
                </Switch>
            </Layout>
        </BrowserRouter>
    )
}

export default App;