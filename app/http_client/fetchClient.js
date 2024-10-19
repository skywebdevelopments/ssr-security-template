import { redirect } from "next/navigation";

export const fetchClient = async (url, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(options.session && options.session.access_token
      ? { Authorization: `Bearer ${options.session.access_token}` }
      : {}),
    ...options.headers, // Merge with any headers provided in the options
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  let result = await response.json();
  let result_status = await response.status;

  
  if (result_status === 401) {
    redirect("/login");
  }
  if (result_status === 403) {
    redirect("/unauthorized");
  }
  // Handle non-200 responses
  if (!response.ok) {
    try {
      return result;
    } catch (error) {
      throw new Error(error.message || "An error occurred while fetching data");
    }
  }

  // Return the response body (if any) as JSON

  return result;
};
