"use client";
import { useRouter } from "next/navigation"; 
function BackToLogin() {
    const router = useRouter();

  const handleBackToLogin = () => {
    // Client-side redirect using useRouter
    console.log("handleBackToLogin");

    router.push("/login");
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
