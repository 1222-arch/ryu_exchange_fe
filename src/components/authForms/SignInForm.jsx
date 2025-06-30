import React, { useState } from "react";
import FormInput from "./FormInput";
import Button from "../common/Button";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "/src/services/firebase";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(t("errorSigningInGoogle") || "Error signing in with Google");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      resetFormFields();
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert(t("incorrectPassword"));
          break;
        case "auth/user-not-found":
          alert(t("userNotFound"));
          break;
        default:
          console.log(error);
          alert(t("signInError") || "Sign in failed");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="flex flex-col w-[380px]">
      <h2 className="my-2.5 text-lg font-semibold">{t("alreadyHaveAccount")}</h2>
      <span className="mb-4 text-gray-700">{t("signInWithEmailAndPassword")}</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={t("email")}
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label={t("password")}
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="flex justify-between mt-4">
          <Button type="submit">{t("signIn")}</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            {t("googleSignIn")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
