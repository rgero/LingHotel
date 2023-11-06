import Button from "../../styles/Button";
import Form from "../../ui/forms/Form";
import FormRowVertical from "../../ui/forms/FormRowVertical";
import Input from "../../styles/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./hooks/useLogin";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, isLoading} = useLogin();

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    if (!email || !password) return;
    login({email, password})
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>{!isLoading ? "Login" : <SpinnerMini/>}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
