import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input } from 'reactstrap';
import { gql, useMutation } from '@apollo/client';
import { default as categories } from '../../constants/directory';
import { useAuthState } from '../../context/auth';
import ImageFileUpload from '../../components/ImageFileUpload/ImageFileUpload';
import classNames from 'classnames';

const CREATE_POST = gql`
  mutation CreatePost(
    $createdby: String!
    $title: String!
    $category: String!
    $location: String!
    $price: Int!
    $condition: String!
    $imageurl: String!
    $description: String!
    $shipping: Boolean!
  ) {
    createPost(
      createdby: $createdby
      title: $title
      category: $category
      location: $location
      price: $price
      condition: $condition
      imageurl: $imageurl
      description: $description
      shipping: $shipping
    ) {
      pid
      category
    }
  }
`;

const ItemSellPage = ({ ...props }) => {
  const { user } = useAuthState();
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [createPost, { error }] = useMutation(CREATE_POST, {
    onCompleted({ createPost }) {
      if (createPost) {
        const category = Object.values(categories).find(
          (category) => category.category === createPost.category
        );
        props.history.push(`/${category.linkUrl}`);
      }
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

    createPost({
      variables: {
        createdby: user.uid,
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
            <option value="">--Choose an option--</option>
            {Object.values(categories).map((category) => (
              <option key={category.id}>{category.category}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="select">
            <span className="required-field">*</span>Condition
          </Label>
          <Input type="select" name="condition" onChange={onChange} required>
            <option value="">--Choose an option--</option>
            <option>New</option>
            <option>Like New</option>
            <option>Good</option>
            <option>Fair</option>
            <option>Poor</option>
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
          Sell your item
        </button>
      </Form>
    </Container>
  );
};

export default ItemSellPage;
