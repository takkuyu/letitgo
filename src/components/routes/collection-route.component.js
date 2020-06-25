import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from "../../pages/homepage/homepage.component";
import CollectionPage from "../../pages/collection/collectionpage.component";
import { requestPosts } from '../../redux/postings/postings.actions'
import WithSpinner from '../with-spinner/with-spinner.component';

const HomepageWithSpinner = WithSpinner(HomePage);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class CollectionRoute extends React.Component {
    state = {
        isLoading: true
    };

    componentDidMount() {
        this.fetchPostings();
    }

    async fetchPostings() {
        const { requestPosts } = this.props;
        await requestPosts();
        this.setState({ isLoading: false });
    }

    render() {
        const { match } = this.props;
        const { isLoading } = this.state;
        console.log('rednde')

        return (
            <>
                <Route
                    path={`${match.url}`}
                    exact
                    render={props => (
                        <HomepageWithSpinner isLoading={isLoading} {...props} />
                    )}
                />
                <Route
                    path={`/shop/:category`}
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
