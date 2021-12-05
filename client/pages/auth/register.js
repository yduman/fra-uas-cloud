import AuthForm from "../../components/AuthForm";

export default function RegisterPage() {
  return <AuthForm apiUrl="/api/users/register" destination="/" title="Register" />;
}
