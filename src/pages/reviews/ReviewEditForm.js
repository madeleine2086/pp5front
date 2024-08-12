import { FormGroup } from "@mui/material";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/ReviewEditCreateForm.module.css";
import useAlert from "../../hooks/useAlert";

function ReviewEditForm(props) {
  const { id, content, setShowEditForm, setReviews, 
    product_name,
   } = props;

   const [formProductName, setFormProductName] = useState(product_name);
   const [formContent, setFormContent] = useState(content)
   const { setAlert } = useAlert();

  const handleProductName = (event) => {
    setFormProductName(event.target.value);
  };

  const handleContent = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/reviews/${id}/`, {
        product_name: formProductName.trim(),
        content: formContent.trim(),
      });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) => {
          return review.id === id
            ? {
                ...review,
                product_name: formProductName.trim(),
                content: formContent.trim(),
                updated_at: "now",
              }
            : review;
        }),
      }));
      setShowEditForm(false);
      setAlert("Review edited", "success");
    } catch (err) {
      setAlert(err.message, "error");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          className={styles.Form}
          as="textarea"
          name="product_name"
          value={formProductName}
          onChange={handleProductName}
          rows={4}
        />
      </Form.Group>
      <FormGroup>
        <Form.Control
          className={styles.Form}
          as="textarea"
          name="content"
          value={formContent}
          onChange={handleContent}
          rows={4}
        />
      </FormGroup>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </button>
        <button
          className={styles.Button}
          disabled={!formProductName.trim()}
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  );
}

export default ReviewEditForm;