import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewPost from '../newpost.component';
import EditPosting from '../edit-posting.component';
import Profile from '../profile.component';
import ShopRoute from './shop-route.component';
import HomePage from '../../pages/homepage/homepage.component';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/shop/:category" render={(props) => <ShopRoute {...props} />} />
    <Route path="/sell" exact component={NewPost} />
    <Route path="/update/:id" exact component={EditPosting} />
    <Route path="/profile" exact component={Profile} />
  </Switch>
);

export default Routes;
