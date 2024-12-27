import React from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";

import LogoIcon from "assets/images/logos/LogoIcon";

import TextButton from "components/buttons/text_button/TextButton";
import BaseInput from "components/inputs/base_input/BaseInput";

import classes from "./SignInPage.module.scss";

const SignInPage = () => {
  const navigate = useNavigate();
  const methods = useFormContext();

  const onSubmit = () => {
    navigate("/signin/auth");
  };

  return (
    <section className={classes.signin_section}>
      <div className={classes.signin_title_wrap}>
        <LogoIcon />
        <h2 className={classes.signin_title}>회원가입</h2>
      </div>
      <form
        className={classes.sign_form}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className={classes.signin_input_wrap}>
          <BaseInput
            type="text"
            width="100%"
            placeholder="닉네임"
            align="start"
            registerName="nickname"
            registerOption={{}}
          />
          <div className={classes.signin_input_button_wrap}>
            <BaseInput
              type="text"
              width="100%"
              placeholder="이메일"
              align="start"
              registerName="email"
              registerOption={{}}
            />
          </div>
          <BaseInput
            type="password"
            width="100%"
            placeholder="비밀번호"
            align="start"
            registerName="password"
            registerOption={{}}
          />
          <BaseInput
            type="password"
            width="100%"
            placeholder="비밀번호 확인"
            align="start"
            registerName="passwordCheck"
            registerOption={{}}
          />
        </div>
        <TextButton
          type="submit"
          text="회원가입"
          width={"100%"}
          size="xlarge"
        />
        <div className={classes.login_notice_wrap}>
          <span>이미 회원이신가요?</span>
          <TextButton
            type="button"
            text="로그인"
            theme="primary-line"
            p="s"
            size="normal"
          />
        </div>
      </form>
    </section>
  );
};

export default SignInPage;
