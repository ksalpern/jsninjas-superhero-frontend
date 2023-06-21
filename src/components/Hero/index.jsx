import React from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./Hero.module.scss";
import { UserInfo } from "../UserInfo";
import { HeroSkeleton } from "./Skeleton";
import { fetchRemoveHero } from "../../redux/slices/heros";

export const Hero = ({
  id,
  nickName,
  realName,
  description,
  catchPhrase,
  tags,
  imageUrl,
  createdAt,
  user,
  viewsCount,
  commentsCount,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <HeroSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm("Are you sure to delete a hero?")) {
      dispatch(fetchRemoveHero(id));
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/heros/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={realName}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {/* {isFullPost ? nickName :  //  }*/}
            <Link to={`/heros/${id}`}>{`${nickName}(${realName})`}</Link>
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
