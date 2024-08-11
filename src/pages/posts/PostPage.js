import { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Comment from "../comments/Comment";
import CommentCreateForm from "../comments/CommentCreateForm";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import styles from "../../styles/PostPage.module.css";
import { fetchMoreData } from "../../utils/utils";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import PopularPosts from "./PopularPosts";

function PostPage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  const currentUser = useCurrentUser();

  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
        setHasLoaded(true);
      } catch (err) {
        //console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      handleMount();
    }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        
        {hasLoaded ? (
          <>
            <Post {...post.results[0]} setPosts={setPost} postPage />
            <Container className={`${appStyles.Content} ${styles.Comments}`}>
              {currentUser ? (
                <CommentCreateForm
                  profile_id={currentUser.profile_id}
                  profileImage={profile_image}
                  post={id}
                  setPost={setPost}
                  setComments={setComments}
                />
              ) : comments.results.length ? (
                <h5>Comments</h5>
              ) : null}
              {comments.results.length ? (
                <InfiniteScroll
                  // eslint-disable-next-line react/no-children-prop
                  children={comments.results.map((comment) => (
                    <Comment
                      key={comment.id}
                      {...comment}
                      setPost={setPost}
                      setComments={setComments}
                    />
                  ))}
                  dataLength={comments.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!comments.next}
                  next={() => fetchMoreData(comments, setComments)}
                />
              ) : currentUser ? (
                <span className={styles.NoComment}>
                  Be the first one to comment
                </span>
              ) : (
                <Tooltip title="You have to log in to comment" placement="top" arrow>
                  <Link to={"/signin"}>
                    <span className={styles.NoComment}>Be the first one to comment</span>
                  </Link>
                </Tooltip>
              )}
            </Container>
            <PopularPosts mobile />
          </>
        ) : (
          <Asset spinner />
        )}
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
      <PopularProfiles />
      <PopularPosts />
      </Col>
    </Row>
  );
}

export default PostPage;
