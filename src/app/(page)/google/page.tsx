"use client";
import { useGoogleLogin } from "@react-oauth/google";

export default function MyComponent() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse.access_token),
  });

  return <button onClick={() => login()}>Sign in with Google 🚀</button>;
}
