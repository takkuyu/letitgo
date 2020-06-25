import React from 'react';
import { Link } from 'react-router-dom';
import SmallItemCard from '../item-card/small-item-card.component'
import {
    Row, Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPostsByCategory } from '../../redux/postings/postings.selectors'

const CollectionOverview = ({ postsByCategory, category }) => {
    return (
        <div className="collection-overview" >
            <h2>{category.heading}</h2>
            <Row>
                {
                    postsByCategory.map((post, index) => index < 5 ? <SmallItemCard post={post} key={index} /> : '')
                }
                <Col sm={3} md={2}>
                    <p class="see-all-btn"><Link to={`/${category.linkUrl}`}>See all</Link></p>
                </Col>
            </Row>
        </div >
    );
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
    postsByCategory: selectPostsByCategory(ownProps.category.category),
})

export default connect(mapStateToProps)(CollectionOverview);
