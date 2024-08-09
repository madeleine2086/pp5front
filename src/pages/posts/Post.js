import { useState, useEffect } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { axiosReq } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import Reviews from "../reviews/Reviews";
import ReviewCreateForm from "../reviews/ReviewCreateForm";
import Tooltip from "@mui/material/Tooltip";
import appStyles from "../../App.module.css";
import useAlert from "../../hooks/useAlert";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [reviews, setReviews] = useState({ results: [] });
  const [reviewOpen, setReviewOpen] = useState(false);
  const { setAlert } = useAlert();


  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.push("/");
      setAlert("You have deleted your post", "success");
    } catch (err) {
      setAlert(err.message, "Error");
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setAlert("You liked this post!", "success");
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      setAlert(err.message, "error");
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setAlert("You unliked this post", "success");
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      setAlert(err.message, "error");
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosReq.get(`/reviews/?post=${id}`);
        setReviews(data);
      } catch (err) {
        // console.log(err);
      }
    };

    const timer = setTimeout(() => {
      fetchReviews();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [id, currentUser]);

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <>You can't like your own post!</>
                </Tooltip>
              }
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
        <div>
          {reviews.results.length ? (
            <Tooltip title="Click to view the review" placement="bottom" arrow>
              <div
                className={styles.Reviews}
                onClick={() => setReviewOpen(!reviewOpen)}
              >
                See Review
              </div>
            </Tooltip>
          ) : is_owner && currentUser && reviews.results.length === 0 ? (
            <Tooltip title="Click to add a review" placement="bottom" arrow>
              <div
                className={styles.Reviews}
                onClick={() => setReviewOpen(!reviewOpen)}
              >
                Add Review
              </div>
            </Tooltip>
          ) : (
            <div></div>
          )}
        </div>
      </Card.Body>
      {reviewOpen && (
        <Card.Body>
          {is_owner && currentUser && reviews.results.length === 0 ? (
            <ReviewCreateForm
              profile_id={currentUser.profile_id}
              post={id}
              setReviews={setReviews}
            />
          ) : reviews.results.length ? (
            <Reviews {...reviews.results[0]} setReviews={setReviews} />
          ) : currentUser ? (
            <span className={styles.NoReview}>
              No review has been added yet!
            </span>
          ) : (
            <span className={styles.NoReview}>
              Sorry no review has been added yet!
            </span>
          )}
        </Card.Body>
      )}
    </Card>
  );
};

export default Post;
