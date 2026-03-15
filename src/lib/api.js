const BASE_URL = "http://localhost:3000/api";

export const registerUser = async (data) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method:"POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(data),
    });

    return res.json();
};

export const loginUser = async (data) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    return res.json();
};

export const createTask = async (data, token) => {
  if (!token) return { message: "User not logged in" };
  if (!data.title || !data.description)
    return { message: "Title and description are required" };

  try {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.trim()}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { message: "Server error", error };
  }
};

export const getTasks = async (token) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const updateTask = async (data, token) => {
    const res = await fetch(`${BASE_URL}/tasks/update`, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    return res.json();
};

export const deleteTask = async (id, token) => {
  const res = await fetch(`${BASE_URL}/tasks/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  return res.json();
};