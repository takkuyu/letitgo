import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ItemSellPage from '../../pages/ItemSellPage/ItemSellPage';
import Profile from '../../pages/ProfilePage/ProfilePage';
import ShopRoute from './ShopRoute';
import HomePage from '../../pages/HomePage/HomePage';
import MessagesPage from '../../pages/MessagesPage/MessagesPage';
import PrivateRoute from './PrivateRoute';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/shop/:category" render={(props) => <ShopRoute {...props} />} />
    <PrivateRoute exact path="/sell" component={ItemSellPage} />
    <PrivateRoute exact path="/messages" component={MessagesPage} />
    <PrivateRoute exact path="/profile" component={Profile} />
    {/* <PrivateRoute exact path="/update/:id" component={EditPosting}  /> */}
  </Switch>
);

export default Routes;
