import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import CollectionOverview from '../../components/collection/collection-overview.component';
import { connect } from 'react-redux';
import { selectDirectoryCategories } from '../../redux/directory/directory.selectors';
import { createStructuredSelector } from 'reselect';
import { requestPosts } from '../../redux/postings/postings.actions';
import { selectIsPostsLoaded } from '../../redux/postings/postings.selectors';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.requestPosts();
  }

  render() {
    const { categories, isPostsLoaded } = this.props;

    return (
      <div className="homepage">
        <div className="homepage__top">
          <Container>
            <div className="homepage__top-wrapper">
              <div className="homepage__top-wrapper-content">
                <p className="leading">Sell from home</p>
                <p className="sub-leading">Make a little money.</p>
                <p className="link-btn">
                  <Link to="">Sell now</Link>
                </p>
              </div>
              <img
                src="https://u-web-assets.mercdn.net/assets/banner/lux-sell-desktop.png"
                alt="wallet"
              />
            </div>
          </Container>
        </div>
        <Container>
          {categories.map((category, index) =>
            category.category === 'Other' ? (
              ''
            ) : (
              <CollectionOverview
                key={index}
                category={category}
                isPostsLoaded={isPostsLoaded}
              />
            )
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  categories: selectDirectoryCategories,
  isPostsLoaded: selectIsPostsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  requestPosts: () => dispatch(requestPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
