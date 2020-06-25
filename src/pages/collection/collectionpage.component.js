import React from 'react';
import { Link } from 'react-router-dom';
import {
    Row, Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPostsByCategory } from '../../redux/postings/postings.selectors';

const CollectionPage = ({collectionItems}) => {
    console.log(collectionItems)
    return (
        <div className="collection-page" >
                <h1>HELLO</h1>
        </div >
    );
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
    collectionItems: selectPostsByCategory(ownProps.match.params.category),
})

export default connect(mapStateToProps)(CollectionPage);