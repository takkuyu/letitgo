import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Signin from "../signin.component";
import Register from "../register.component";
import NewPost from "../newpost.component";
import EditPosting from "../edit-posting.component";
import Favorite from "../favorite.component";
import Comment from "../comment.component";
import Profile from "../profile.component";
import CollectionRoute from "./collection-route.component";

const Routes = () => (
    <Switch>
        <Route path="/" exact component={CollectionRoute} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/register" exact component={Register} />
        <Route path="/newpost" exact component={NewPost} />
        <Route path="/update/:id" exact component={EditPosting} />
        <Route path="/favorite" exact component={Favorite} />
        <Route path="/postings/comments/:id" exact component={Comment} />
        <Route path="/profile" exact component={Profile} />
    </Switch>
);

export default Routes;