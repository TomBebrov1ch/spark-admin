"use client";

import { Button } from "@shared/ui/Buttons_Components/Buttons";
import Input from "@shared/ui/Inputs/DefaultInport";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";
import MiniText from "@shared/ui/MiniText/index";
import Heading from "@shared/ui/Heading/index";
import { useSubmitLogin } from "@shared/lib/hooks/Form/useSubmitLogin";
import { ErrorDisplay } from "@shared/ui/Error";
import { useClickChangePassword } from "@shared/lib/hooks/Form/useClickChangePassword";

import styles from "../styles/styles.module.scss";

import SparkLogo from "@assets/spark_product_logo.svg";

const LoginForm = () => {
  const { handleClickChangePassword } = useClickChangePassword();

  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    handleSubmit,
  } = useSubmitLogin();

  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__content__logo}>
          <SparkLogo />
        </div>
        <Heading text="Войти" margin="mt-8" />
        <form
          className={styles.registration__content__form}
          onSubmit={handleSubmit}
        >
          <Input
            placeholder={"example@gmail.com"}
            inputType="default"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            placeholder="Пароль"
            type="password"
            margin="mt-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ErrorDisplay message={passwordError} />
          <MiniText
            margin="mt-2"
            href="change-password"
            text="Забыли ваш"
            linktext="пароль?"
            onClick={handleClickChangePassword}
          />
          <Button text="Войти" buttonType="regular" margin="mt-4" />
        </form>
        <MiniText
          margin="mt-2"
          href="registration"
          text="Еще нет аккаунта?"
          linktext="Создать аккаунт"
        />
      </div>
    </section>
  );
};

export default LoginForm;
