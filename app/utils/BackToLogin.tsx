"use client";
import { redirect } from "next/navigation";

function BackToLogin() {

  const handleBackToLogin = () => {
    // Client-side redirect using useRouter
    console.log("handleBackToLogin");
    
    redirect("/login");
  };
  return (
    <div>
      <button
        className="bg-red-900 text-white font-bold p-4"
        onClick={handleBackToLogin}
      >
        Back to Login
      </button>
    </div>
  );
}

export default BackToLogin;
