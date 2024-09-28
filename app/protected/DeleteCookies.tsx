"use client";

function DeleteCookies() {
  function deleteCookie(name: string) {
    document.cookie = name + "=; Max-Age=0; path=/;";
  }
  return <div>Enter</div>;
}

export default DeleteCookies;
