export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return true;
  }
  if (sessionStorage.getItem("user")) {
    return JSON.parse(sessionStorage.getItem("user"));
  } else {
    return false;
  }
};

export const signout = () => {
  sessionStorage.removeItem("user");
  return true;
};
