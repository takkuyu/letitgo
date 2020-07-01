import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from "../../pages/homepage/homepage.component";
import CollectionPage from "../../pages/collection/collectionpage.component";
import { requestPosts } from '../../redux/postings/postings.actions'
import WithSpinner from '../with-spinner/with-spinner.component';

// const HomepageWithSpinner = WithSpinner(HomePage);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class CollectionRoute extends React.Component {
    state = {
        isLoading: true
    };

    componentDidMount() {
        this.fetchPostings();
        console.log('shop route componentDidMount')
    }

    async fetchPostings() {
        const { requestPosts } = this.props;
        await requestPosts();
        this.setState({ isLoading: false });
    }

    render() {
        const { match } = this.props;
        const { isLoading } = this.state;
        console.log('shop route render')

        return (
            <>
                {/* <Route
                    path={`${match.url}`}
                    exact
                    render={props => (
                        <HomepageWithSpinner isLoading={isLoading} {...props} />
                    )}
                /> */}
                <Route
                    path={`${match.url}/:category`}
                    key={this.props.location.key}
                    exact
                    render={props => <CollectionPageWithSpinner isLoading={isLoading} {...props} />}
                />
            </>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    requestPosts: () => dispatch(requestPosts())
});

export default connect(
    null,
    mapDispatchToProps
)(CollectionRoute);
