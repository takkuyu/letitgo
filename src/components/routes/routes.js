import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ItemSellPage from '../../pages/ItemSellPage/ItemSellPage';
import EditPosting from '../edit-posting.component';
import Profile from '../profile.component';
import ShopRoute from './shop-route.component';
import HomePage from '../../pages/homepage/homepage.component';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/shop/:category" render={(props) => <ShopRoute {...props} />} />
    <Route path="/sell" exact render={(props) => <ItemSellPage {...props} />} />
    <Route path="/update/:id" exact component={EditPosting} />
    <Route path="/profile" exact component={Profile} />
  </Switch>
);

export default Routes;
