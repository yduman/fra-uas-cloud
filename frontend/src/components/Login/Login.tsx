import React from "react";

import { LoginForm } from "./LoginForm";
import { HeroImage } from "../Styled";
import heroImg from "../../assets/hero.jpg";

export default function Login() {
  return (
    <React.Fragment>
      <HeroImage className="page-container" img={heroImg}>
        <LoginForm />
      </HeroImage>
    </React.Fragment>
  );
}
