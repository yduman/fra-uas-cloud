import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
  return <AuthForm apiUrl="/api/users/login" destination="/" title="Login" />;
}
