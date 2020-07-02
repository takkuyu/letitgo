import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Itempage from "../../pages/itempage/itempage.component";
import CollectionPage from "../../pages/collection/collectionpage.component";
import { requestPosts } from '../../redux/postings/postings.actions'
import WithSpinner from '../with-spinner/with-spinner.component';

const ItempageWithSpinner = WithSpinner(Itempage);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class CollectionRoute extends React.Component {
    state = {
        isLoading: true
    };

    componentDidMount() {
        this.fetchPostings();
        console.log(this.props.location.search.category)
        // console.log('shop route componentDidMount')
    }

    async fetchPostings() {
        const { requestPosts } = this.props;
        await requestPosts();
        this.setState({ isLoading: false });
    }

    render() {
        const { match } = this.props;
        const { isLoading } = this.state;
        // console.log('shop route render')
        console.log(match)

        return (
            <>
                <Route
                    path={`${match.url}/:category`}
                    key={this.props.location.key}
                    exact
                    render={props => <CollectionPageWithSpinner isLoading={isLoading} {...props} />}
                />
                <Route
                    path={`${match.url}/:category/:id`}
                    exact
                    render={props => (
                        <ItempageWithSpinner isLoading={isLoading} {...props} />
                    )}
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
