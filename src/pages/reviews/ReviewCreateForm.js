import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import styles from "../../styles/ReviewEditCreateForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";

function ReviewCreateForm(props) {
  const { post, setReviews } = props;
  const [product_name, setProductName] = useState("");
  const [content, setContent] = useState("");

  const handleProductName = (event) => {
    setProductName(event.target.value);
  };

  const handleContent = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/reviews/", {
        product_name,
        content,
        post,
      });

      setReviews((prevReviews) => ({
        ...prevReviews,
        results: [data, ...prevReviews.results],
      }));

      setReviews((prevReviews) => ({
        results: [
          {
            ...prevReviews.results[0],
            reviews_count: prevReviews.results[0].reviews_count + 1,
          },
        ],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          className={styles.Form}
          placeholder="Product Name"
          as="textarea"
          name="product_name"
          value={product_name}
          onChange={handleProductName}
          rows={4}
        />
        <Form.Control
          className={styles.Form}
          placeholder="Your review.."
          as="textarea"
          name="content"
          value={content}
          onChange={handleContent}
          rows={4}
        />
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!product_name.trim()}
        type="submit"
      >
        Post your review
      </button>
    </Form>
  );
}

export default ReviewCreateForm;