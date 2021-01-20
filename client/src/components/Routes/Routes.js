import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ItemSellPage from '../../pages/ItemSellPage/ItemSellPage';
import ItemEditPage from '../../pages/ItemEditPage/ItemEditPage';
import Profile from '../../pages/ProfilePage/ProfilePage';
import ShopRoute from './ShopRoute';
import HomePage from '../../pages/HomePage/HomePage';
import MessagesPage from '../../pages/MessagesPage/MessagesPage';
import PrivateRoute from './PrivateRoute';
import DemoLogin from '../DemoLogin/DemoLogin';

const Routes = () => (
  <Switch>
    <Route path="/" exact render={(props) => <HomePage {...props} />} />
    <Route
      path="/shop/:category"
      render={(props) => <ShopRoute {...props} />}
    />
    <PrivateRoute exact path="/sell" component={ItemSellPage} />
    <PrivateRoute exact path="/messages" component={MessagesPage} />
    <PrivateRoute exact path="/profile" component={Profile} />
    <PrivateRoute exact path="/edit/:id" component={ItemEditPage} />
    <Route
      exact
      path="/demo/:id"
      render={(props) => <DemoLogin {...props} />}
    />
  </Switch>
);

export default Routes;
