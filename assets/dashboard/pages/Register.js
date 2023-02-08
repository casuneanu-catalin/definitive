import React from "react";
import AuthLayout from "../components/AuthLayout";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";
import RegistrationContext from "../context/registration/registrationContext";

export default function Register() {
  const {activeStepIndex} = React.useContext(RegistrationContext);
  const navigate = useNavigate();
  const redirectToLogin = () => navigate("/dashboard/login");

  return (
    <AuthLayout>
      <section>
        <div className="container">
          <RegisterForm />
        </div>
      </section>
    </AuthLayout>
  );
}
