import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function LogIn() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { logIn, signInWithGoogle, signInWithGithub } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      setError("");
      await logIn(data.email, data.password);
      navigate("/", { replace: true });
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  };

  const handelLoginWithGoogle = async () => {
    setLoading(true);

    try {
      setError("");
      await signInWithGoogle();
      navigate("/");
    } catch {
      setError("Failed to log in With Google");
    }
    setLoading(false);
  };

  const handelLoginWithGithub = async () => {
    setLoading(true);

    try {
      setError("");
      await signInWithGithub();
      navigate("/");
    } catch {
      setError("Failed to log in With Github");
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <h1 className="text-center mb-4">Log In</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Loading />}
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          {...register("email")}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          {...register("password")}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <div className="text-center my-2">
        <Link className="text-decoration-none" to="/forgetpassword">
          Forget your password?
        </Link>
      </div>
      <Button
        className="mt-3"
        style={{ width: "100%" }}
        variant="primary"
        type="submit"
      >
        Log In
      </Button>
      <div className="d-flex flex-column gap-1 justify-content-center align-items-center">
        <Button
          onClick={handelLoginWithGoogle}
          className="d-flex gap-2 justify-content-center align-items-center mt-3 w-100 btn-danger"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-google"
            viewBox="0 0 16 16"
          >
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
          </svg>
          Sign in With google
        </Button>
        <Button
          onClick={handelLoginWithGithub}
          className="d-flex gap-2 justify-content-center align-items-center mt-3 w-100 btn-dark border border-1 border-dark"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          Sign in With Github
        </Button>
      </div>
      <p className="text-center mt-3">
        Do you have account?{" "}
        <Link className="text-decoration-none" to="/signup">
          Sign Up
        </Link>
      </p>
    </Form>
  );
}

export default LogIn;
