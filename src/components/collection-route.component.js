import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from "../pages/homepage.component";


class CollectionRoute extends React.Component {

    componentDidMount() {
        // const { fetchCollectionsStartAsync, match} = this.props;

        // fetchCollectionsStartAsync(match.params.category, match.params.gender);
    }

    render() {
        const { match } = this.props;
        // console.log('shop.js render')
        return (
            <>
                <Route
                    path={`${match.url}`}
                    exact
                    component={HomePage}
                />
                {/* <Route
                    path={`${match.url}/:id(\\d+)`}
                    exact
                    render={props => <ItemPageContainer {...props} />} // props have to be passed on this component to get match.params.id.
                /> */}
            </>
        );
    }
}


const mapDispatchToProps = dispatch => ({

});

export default connect(
    null,
    mapDispatchToProps
)(CollectionRoute);
