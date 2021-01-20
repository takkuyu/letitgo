import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input } from 'reactstrap';
import { gql, useMutation, useQuery } from '@apollo/client';
import directory, { default as categories } from '../../constants/directory';
import Spinner from '../../components/Spinner/Spinner';
import { itemConditions } from '../../constants/post';
import ImageFileUpload from '../../components/ImageFileUpload/ImageFileUpload';
import classNames from 'classnames';

const GET_POST = gql`
  query getPost($pid: String!) {
    getPost(pid: $pid) {
      pid
      title
      price
      category
      condition
      location
      imageurl
      description
      shipping
    }
  }
`;

const EDIT_POST = gql`
  mutation editPost(
    $pid: String!
    $title: String!
    $price: Int!
    $category: String!
    $condition: String!
    $location: String!
    $imageurl: String!
    $description: String!
    $shipping: Boolean!
  ) {
    editPost(
      pid: $pid
      title: $title
      price: $price
      category: $category
      condition: $condition
      location: $location
      imageurl: $imageurl
      description: $description
      shipping: $shipping
    ) {
      pid
      category
    }
  }
`;

const ItemEditPage = ({ match, history, ...props }) => {
  const { loading, data: postData } = useQuery(GET_POST, {
    variables: { pid: match.params.id },
    fetchPolicy: 'no-cache',
  });

  const [editPost, { error }] = useMutation(EDIT_POST, {
    onCompleted({ editPost }) {
      const dir = Object.values(directory).find(
        (dir) => dir.category === editPost.category
      );
      history.push(`/${dir.linkUrl}`);
    },
  });

  const [formValues, setFormValues] = useState({
    title: '',
    price: '',
    category: '',
    condition: '',
    location: '',
    imageurl: '',
    description: '',
    shipping: false,
  });

  useEffect(() => {
    if (!loading && postData) {
      setFormValues({
        ...postData.getPost,
      });
    }
  }, [loading]);

  const [isImageLoading, setIsImageLoading] = useState(false);

  const {
    title,
    price,
    category,
    location,
    condition,
    imageurl,
    description,
    shipping,
  } = formValues;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isImageLoading) return;

    if (!imageurl) {
      alert('Image field is empty!');
      return;
    }

    editPost({
      variables: {
        pid: postData.getPost.pid,
        title: title,
        category: category,
        location: location,
        price: Number(price),
        condition: condition,
        imageurl: imageurl,
        description: description,
        shipping: shipping,
      },
    });
  };

  if (loading || !postData) return <Spinner />;

  return (
    <Container className="item-sell-page">
      <h2 className="item-sell-page-title">Sell your item</h2>
      <Form className="item-sell-page-form" onSubmit={onSubmit}>
        <FormGroup>
          <Label>
            <span className="required-field">*</span>Title
          </Label>
          <Input
            type="text"
            name="title"
            placeholder="Enter a title"
            onChange={onChange}
            value={title}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <span className="required-field">*</span>Price
          </Label>
          <Input
            type="number"
            name="price"
            placeholder="Enter a price"
            onChange={onChange}
            value={price}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="select">
            <span className="required-field">*</span>Category
          </Label>
          <Input type="select" name="category" onChange={onChange} required>
            {Object.values(categories).map((c) =>
              category === c.category ? (
                <option key={category.id} selected>
                  {c.category}
                </option>
              ) : (
                <option key={category.id}>{c.category}</option>
              )
            )}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="select">
            <span className="required-field">*</span>Condition
          </Label>
          <Input type="select" name="condition" onChange={onChange} required>
            {Object.values(itemConditions).map((itemCondition) =>
              condition === itemCondition ? (
                <option key={itemCondition} selected>
                  {itemCondition}
                </option>
              ) : (
                <option key={itemCondition}>{itemCondition}</option>
              )
            )}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>
            <span className="required-field">*</span>Location
          </Label>
          <Input
            type="text"
            name="location"
            placeholder="Enter a location"
            onChange={onChange}
            value={location}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <span className="required-field">*</span>Upload Image
          </Label>
          <ImageFileUpload
            id="imageurl"
            text="Upload an image"
            accept="image/png,image/jpeg"
            name="imageurl"
            description="* File format: png or jpeg."
            isImageLoading={isImageLoading}
            setIsImageLoading={setIsImageLoading}
            onChange={(fileUrl) =>
              setFormValues({ ...formValues, imageurl: fileUrl })
            }
          />
          {imageurl && (
            <img src={imageurl} alt="item image" style={{ width: '300px' }} />
          )}
        </FormGroup>
        <FormGroup>
          <Label>
            <span className="required-field">*</span>Description
          </Label>
          <Input
            type="textarea"
            name="description"
            placeholder="Describe your item here"
            onChange={onChange}
            value={description}
            required
            style={{
              height: '200px',
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <span className="required-field">*</span>Free Shipping
            <Input
              type="checkbox"
              name="shipping"
              className="custom-checkbox"
              checked={shipping}
              onChange={() =>
                setFormValues({ ...formValues, shipping: !shipping })
              }
            />
          </Label>
          <small className="d-block">
            * You need to pay for the shipping fees if checked.
          </small>
        </FormGroup>
        <button
          className={classNames('button', {
            'button-disable': isImageLoading,
          })}
          type="submit"
        >
          Update your item
        </button>
      </Form>
    </Container>
  );
};

export default ItemEditPage;
