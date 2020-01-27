import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Signin from "./signin.component";
import MainScreen from "./mainscreen.component";
import Register from "./register.component";
import NewPost from "./newpost.component";
import EditPosting from "./edit-posting.component";
import Favorite from "./favorite.component";
import Comment from "./comment.component";


const Routes = () => {
    return (
        <section className='container'>
            <Switch>
                <Route path="/signin" exact component={Signin} />
                <Route path="/register" exact component={Register} />
                <Route path="/mainscreen" exact component={MainScreen} />
                <Route path="/newpost" exact component={NewPost} />
                <Route path="/update/:id" exact component={EditPosting} />
                <Route path="/favorite" exact component={Favorite} />
                <Route path="/comments" exact component={Comment} />
            </Switch>
        </section>
    );
};

export default Routes;