import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ItemSellPage from '../../pages/ItemSellPage/ItemSellPage';
import Profile from '../../pages/ProfilePage/ProfilePage';
import ShopRoute from './ShopRoute';
import HomePage from '../../pages/HomePage/HomePage';
import MessagesPage from '../../pages/MessagesPage/MessagesPage';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/shop/:category" render={(props) => <ShopRoute {...props} />} />
    <Route path="/sell" exact render={(props) => <ItemSellPage {...props} />} />
    <Route path="/messages" exact render={(props) => <MessagesPage {...props} />} />
    {/* <Route path="/update/:id" exact component={EditPosting} /> */}
    <Route path="/profile" exact component={Profile} />
  </Switch>
);

export default Routes;
