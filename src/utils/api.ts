const API = "https://norma.nomoreparties.space/api";
const wsAllOrdersAPI = "wss://norma.nomoreparties.space/orders/all";
const wsUserOrdersAPI = "wss://norma.nomoreparties.space/orders";

const headers = {
  "Content-Type": "application/json",
};

function checkResponse(res: Response, type: string) {
  const status = res.ok;
  const contentType = res.headers.get("content-type");
  if (status && contentType?.includes(type)) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

async function resetPasswordRequest(form: TResetPasswordForm) {
  const res = await fetch(`${API}/password-reset/reset`, {
    method: "POST",
    body: JSON.stringify(form),
    headers,
  });
  const data = await checkResponse(res, "application/json");
  return data;
}

async function updatePasswordRequest(form: TForgotPasswordForm) {
  const res = await fetch(`${API}/password-reset`, {
    method: "POST",
    body: JSON.stringify(form),
    headers,
  });
  const data = await checkResponse(res, "application/json");
  return data;
}

async function registerRequest(form: TRegisterForm) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    body: JSON.stringify(form),
    headers,
  });
  const data = await checkResponse(res, "application/json");
  return data;
}

async function loginRequest(form: TLoginForm) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    body: JSON.stringify(form),
    headers,
  });
  const data = await checkResponse(res, "application/json");
  return data;
}

async function logoutRequest(token: string | undefined) {
  const res = await fetch(`${API}/auth/logout`, {
    method: "POST",
    body: JSON.stringify({ token }),
    headers,
  });
  const data = await checkResponse(res, "application/json");
  return data;
}

async function refreshTokenRequest(token: string | undefined) {
  const res = await fetch(`${API}/auth/token `, {
    method: "POST",
    body: JSON.stringify({ token }),
    headers,
  });
  const data = await checkResponse(res, "application/json");
  return data;
}

async function getUserRequest(token: string | undefined) {
  const res = await fetch(`${API}/auth/user `, {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  });
  const data = await checkResponse(res, "application/json");
  return data;
}

async function updateUserRequest(
  form: TUpdateUserForm,
  token: string | undefined
) {
  const res = await fetch(`${API}/auth/user `, {
    method: "PATCH",
    body: JSON.stringify(form),
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  });
  const data = await checkResponse(res, "application/json");
  return data;
}

async function postOrderRequest(
  ingredients: TIngredients,
  token: string | undefined
) {
  const res = await fetch(`${API}/orders`, {
    method: "POST",
    body: JSON.stringify({
      ingredients: [ingredients.bun, ingredients.bun, ...ingredients.main],
    }),
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  });
  const data = await checkResponse(res, "application/json");
  return data;
}

export {
  registerRequest,
  loginRequest,
  refreshTokenRequest,
  logoutRequest,
  getUserRequest,
  updateUserRequest,
  resetPasswordRequest,
  updatePasswordRequest,
  postOrderRequest,
  API,
  wsAllOrdersAPI,
  wsUserOrdersAPI,
  checkResponse,
};
