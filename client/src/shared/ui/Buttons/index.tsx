"use client";
import { useWebPopup } from "@shared/lib/contexts/AppContext";
import { FunctionTypes, functions } from "@shared/lib/hooks/useFunctions";
import Link from "next/link";

import styles from "./styles.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  margin?: string;
  text: string;
  buttonType: "regular" | "transparent" | "regular--small";
  functionType: FunctionTypes;
}

const Button: React.FC<ButtonProps> = ({
  margin,
  text,
  buttonType,
  functionType,
  ...rest
}) => {
  const buttonClass = `${styles.button} ${styles[`button--${buttonType}`]} ${
    margin ? margin : ""
  }`;
  const { toggleWebPopup } = useWebPopup();

  const handleClick = () => {
    if (functionType === "webPopup") {
      toggleWebPopup();
    }
  };

  return (
    <button className={buttonClass} onClick={handleClick} {...rest}>
      {text}
    </button>
  );
};

interface LinkButtonProps {
  margin?: string;
  href: string;
  text: string;
  buttonType: "regular" | "transparent" | "regular--small";
}

const ButtonLink: React.FC<LinkButtonProps> = ({
  margin,
  buttonType,
  href,
  text,
}) => {
  const buttonClass = `${styles.button} ${styles[`button--${buttonType}`]} ${
    margin ? margin : ""
  }`;

  return (
    <Link className={buttonClass} href={href}>
      {text}
    </Link>
  );
};

export { ButtonLink, Button };
