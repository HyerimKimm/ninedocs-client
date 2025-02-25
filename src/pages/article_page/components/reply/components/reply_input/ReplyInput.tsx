import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ReplyIcon from "assets/images/icons/ReplyIcon";

import useAddReply from "apis/comment_apis/useAddReply";

import TextButton from "components/buttons/text_button/TextButton";
import BaseTextarea from "components/inputs/base_textarea/BaseTextarea";

import useIsLogin from "hooks/useIsLogin";

import classes from "./ReplyInput.module.scss";

const ReplyInput = ({ commentId }: { commentId: number }) => {
  const articleId = useParams().articleId;

  const methods = useForm({
    mode: "all",
    defaultValues: {
      content: "",
    },
  });

  const { mutate } = useAddReply();
  const { isLogin } = useIsLogin();

  const onError = (e: FieldErrors) => {
    console.log("onError 실행");
    if (e?.content?.message && typeof e?.content?.message === "string") {
      toast.error(e.content.message);
    }
  };

  const onSubmit = (data: { content: string }) => {
    console.log(`onSubmit 실행`);
    mutate(
      {
        articleId: Number(articleId),
        commentId: commentId,
        content: data.content,
      },
      {
        onSuccess: () => {
          methods.reset();
        },
      },
    );
  };

  return (
    <FormProvider {...methods}>
      <form
        className={classes.input_wrap}
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          if (!isLogin) {
            toast.error("로그인이 필요합니다.");
            return;
          }
          methods.handleSubmit(onSubmit, onError)();
        }}
      >
        <ReplyIcon />
        <div className={classes.input_right}>
          <div className={classes.input}>
            <BaseTextarea
              registerName="content"
              registerOption={{ required: "내용을 입력해 주세요." }}
              placeholder="내용을 입력해 주세요."
            />
          </div>
          <TextButton type="submit" text="등록하기" size="small" p="xs" />
        </div>
      </form>
    </FormProvider>
  );
};

export default ReplyInput;
