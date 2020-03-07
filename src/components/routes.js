import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Signin from "./signin.component";
import MainScreen from "./mainscreen.component";
import Register from "./register.component";
import NewPost from "./newpost.component";
import EditPosting from "./edit-posting.component";
import Favorite from "./favorite.component";
import Comment from "./comment.component";
import Profile from "./profile.component";


const Routes = () => {

    return (
        <section >
            <Switch>
                <Route path="/signin" exact component={Signin} />
                <Route path="/register" exact component={Register} />
                <Route path="/mainscreen" exact component={MainScreen} />
                <Route path="/newpost" exact component={NewPost} />
                <Route path="/update/:id" exact component={EditPosting} />
                <Route path="/favorite/:id" exact component={Favorite} />
                <Route path="/postings/comments/:id" exact component={Comment} />
                <Route path="/profile/:id" exact component={Profile} />
            </Switch>
        </section>
    );
};

export default Routes;