import dayjs from "dayjs";
import { useState } from "react";
import { useParams } from "react-router-dom";

import DeleteIcon from "assets/images/icons/DeleteIcon";
import EditIcon from "assets/images/icons/EditIcon";
import HeartIcon from "assets/images/icons/HeartIcon";

import useDeleteComment from "apis/comment_apis/useDeleteComment";

import BaseButton from "components/buttons/base_button/BaseButton";

import classes from "./CommentItem.module.scss";
import EditComment from "./components/EditComment";

const CommentItem = ({ commentItem }: { commentItem: CommentItemType }) => {
  const articleId = useParams().articleId;

  const { mutate } = useDeleteComment();

  const isMe = commentItem.author.isMe;
  const isMeLike = commentItem.like.isUserLike;

  const [isEditMode, setIsEditMode] = useState(false);

  const handleLikeClick = () => {};

  const handleEditClick = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleDeleteClick = () => {
    mutate({
      articleId: Number(articleId),
      commentId: commentItem.commentId,
    });
  };

  return (
    <article className={classes.item_wrap}>
      {/* 유저이름, 등록일시, 컨텐츠 */}
      <div className={classes.left_wrap}>
        {/* 유저이름, 등록일시 */}
        <div className={classes.first_line}>
          <p className={classes.nickname}>{commentItem.author.nickname}</p>
          <div className={classes.date_time}>
            {dayjs(commentItem.createdAt).format("YYYY-MM-DD A hh:mm")}
            {/* 댓글 삭제 버튼 */}
            {isMe && (
              <>
                <BaseButton theme="none" p="none" onClick={handleDeleteClick}>
                  <div className={classes.delete_icon_wrap}>
                    <DeleteIcon width={14} height={14} />
                  </div>
                </BaseButton>
                <BaseButton theme="none" p="none" onClick={handleEditClick}>
                  <div className={classes.delete_icon_wrap}>
                    <EditIcon width={14} height={14} />
                  </div>
                </BaseButton>
              </>
            )}
          </div>
        </div>
        {/* 컨텐츠 */}
        {!isEditMode && (
          <p className={classes.content}>{commentItem.content}</p>
        )}
        {/* 컨텐츠 - 편집 모드 */}
        {isEditMode && (
          <EditComment
            commentItem={commentItem}
            onClose={() => {
              setIsEditMode(false);
            }}
          />
        )}
      </div>
      {/* 좋아요 버튼, 개수 표시 */}
      <div className={classes.like_wrap}>
        <BaseButton
          theme="none"
          p="none"
          onClick={handleLikeClick}
          br={"8"}
          title="좋아요"
        >
          <HeartIcon width={18} height={16} isFilled={isMeLike} />
        </BaseButton>
        <span>{commentItem.like.count || 0}</span>
      </div>
    </article>
  );
};

export default CommentItem;
