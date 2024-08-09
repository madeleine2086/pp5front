import { useState, useEffect } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { axiosReq } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

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
        {title && (
          <Card.Title className={`${styles.CardTitle} "text-center"`}>
            {title}
          </Card.Title>
        )}
        {content && (
          <Card.Text className={styles.CardDescription}>{content}</Card.Text>
        )}
        <div className={`${styles.PostBar} ${appStyles.BoxShadow}`}>
          <div className={styles.Heart}>
            {is_owner ? (
              <Tooltip
                title="You have to log in to like posts"
                placement="top"
                arrow
              >
                <FavoriteBorderOutlinedIcon />
              </Tooltip>
            ) : like_id ? (
              <span onClick={handleUnlike}>
                <FavoriteIcon sx={{ color: red[500] }} />
              </span>
            ) : currentUser ? (
              <span onClick={handleLike}>
                <FavoriteBorderOutlinedIcon />
              </span>
            ) : (
              <Tooltip
                title="Please login to like posts!"
                placement="top"
                arrow
              >
                <Link to={"/signin"}>
                  <FavoriteIcon />
                </Link>
              </Tooltip>
            )}
            {likes_count}
          </div>
          <div className={styles.Comments}>
            <Link to={`/posts/${id}`} aria-label={title}>
              <ChatBubbleOutlineOutlinedIcon />
            </Link>
            {comments_count}
          </div>
          {reviews.results.length && currentUser ? (
            <Tooltip title="Click to view the review" placement="bottom" arrow>
              <div
                className={styles.Reviews}
                onClick={() => setReviewOpen(!reviewOpen)}
              >
                {!reviewOpen ? (
                  <FeedOutlinedIcon className={styles.Reviews} />
                ) : (
                  <CloseOutlinedIcon />
                )}
                Review
              </div>
            </Tooltip>
          ) : reviews.results.length && !currentUser ? (
            <Tooltip title="Login to view the review" placement="bottom" arrow>
              <Link to={"/signin"} aria-label="Click to sign in">
                <div className={styles.Reviews}>
                  <FeedOutlinedIcon className={styles.Reviews} />
                  Login to see a review
                </div>
              </Link>
            </Tooltip>
          ) : is_owner && reviews.results.length === 0 ? (
            <Tooltip title="Click to add a review" placement="bottom" arrow>
              <div
                className={styles.Reviews}
                onClick={() => setReviewOpen(!reviewOpen)}
              >
                {!reviewOpen ? (
                  <AddCircleOutlineOutlinedIcon />
                ) : (
                  <CloseOutlinedIcon />
                )}
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
