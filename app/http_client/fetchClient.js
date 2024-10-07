export const fetchClient = async (url, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(options.session && options.session.token
      ? { Authorization: `Bearer ${options.session.token}` }
      : {}),
    ...options.headers, // Merge with any headers provided in the options
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle non-200 responses

  if (!response.ok) {
    try {
      const error = await response.json();
      return error;
    } catch (error) {
      throw new Error(error.message || "An error occurred while fetching data");
    }
  }

  // Return the response body (if any) as JSON
  return response.json();
};
