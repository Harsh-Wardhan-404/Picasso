"use client"

export function AuthPage({ isSignIn }: { isSignIn: boolean }) {
  return <div className="h-screen w-screen flex justify-center items-center">
    <div className="p-6 m-2 bg-white rounded">
      <div className="p-2">
        <input type="text" placeholder="Email" />
      </div>
      <div className="p-2">
        <input type="password" placeholder="Password" />
      </div>
      <div className="pt-2">
        <button onClick={() => {

        }}>{isSignIn ? "Sign in" : "Sign up"}</button>
      </div>
    </div>
  </div>
}