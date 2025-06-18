import { AuthPage } from "@/components/AuthPage";

export default function Signin() {
  return <div className="bg-black min-h-screen min-w-screen flex flex-col justify-center items-center"><AuthPage isSignIn={true} /></div>
}