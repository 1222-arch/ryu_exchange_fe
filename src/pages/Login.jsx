import React from "react";
import SignInForm from "../components/authForms/SignInForm";
import { useTranslation } from "react-i18next";  // đổi sang react-i18next

const Login = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: 20 }}>
      <h2>{t('login') || "Login"}</h2>  {/* lấy text từ i18n, fallback nếu không có */}
      <SignInForm />
    </div>
  );
};

export default Login;
