import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { MoreDropdown } from "../../components/MoreDropdown";
import styles from "../../styles/Reviews.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import ReviewEditForm from "./ReviewEditForm";

const Reviews = (props) => {
  const {
    profile_id,
    owner,
    product_name,
    content,
    setReviews,
    id,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/reviews/${id}/`);
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.filter((review) => review.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <>
      <hr />
      <Media>
        <Media.Body className="align-self-center ml-2">
          {is_owner && showEditForm ? (
            <ReviewEditForm
              id={id}
              profile_id={profile_id}
              product_name={product_name}
              content={content}
              setReviews={setReviews}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <>
              <div>
                <h4>Title:</h4>
                <p className={styles.CssFix}>{product_name}</p>
              </div>
              <div>
                <h4>My thoughts on it:</h4>
                <p className={styles.CssFix}>{content}</p>
              </div>
            </>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Reviews;