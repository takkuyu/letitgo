import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Row
} from 'reactstrap';
import Navigation from '../../components/navigation.component'
import CollectionOverview from '../../components/collection/collection-overview.component'
import { connect } from 'react-redux';
import { selectPosts } from '../../redux/postings/postings.selectors';
import { selectDirectoryCategories } from '../../redux/directory/directory.selectors';
import { createStructuredSelector } from 'reselect';

const HomePage = ({ categories }) => {
    console.log(categories)

    return (
        <div className="homepage">
            <Navigation categories={categories}/>
            <div className="homepage__short-content">
                <p className="icon-check-circle"><b>List in minutes.</b> Take a few photos. Add a description. Set your price.</p>
            </div>
            <div className="homepage__top">
                <Container>
                    <div className="homepage__top-wrapper">
                        <div className="homepage__top-wrapper-content">
                            <p className="leading">Sell from home</p>
                            <p className="sub-leading">Make a little money.</p>
                            <p className="link-btn"><Link to="">Sell now</Link></p>
                        </div>
                        <img src="https://u-web-assets.mercdn.net/assets/banner/lux-sell-desktop.png" alt="wallet" />
                    </div>
                </Container>
            </div>
            <Container>
                {
                    categories.map((category, index) => category.category === 'Other' ? '' : <CollectionOverview key={index} category={category} />)
                }
            </Container>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    posts: selectPosts,
    categories: selectDirectoryCategories,
})


export default connect(mapStateToProps)(HomePage);
