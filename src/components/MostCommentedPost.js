import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Fab from "@mui/material/Fab";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';

import appStyles from "../App.module.css";
import styles from "../styles/MostCommentedPost.module.css";

const MostCommentedPost = (props) => {
  const { id, title, comments_count, image } = props;

  return (
    <Container className={styles.Post}>
      <Card className={`${styles.Post} ${appStyles.BoxShadow}`}>
        <Link to={`/posts/${id}`}>
          <Card.Img
            className={`${styles.Image} ${appStyles.ImageHover}`}
            src={image}
            alt={title}
          />
        </Link>
        <Fab
          className={styles.Circle}
          disabled
          size="large"
          color="black"
          aria-label="posts"
        >
          <div className={styles.CountNumber}>
            {comments_count} 
            <CommentOutlinedIcon/>
          </div>
        </Fab>
        <Card.Body className={styles.Card}>
          {title && (
            <Card.Title className={`${styles.Title} ${"text-center"}`}>
              {title}
            </Card.Title>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MostCommentedPost;
