export const retrieveToken = () => {
  const sessionString = localStorage.getItem('token');

  if (!sessionString) {
    return "";
  }

  try {
    const { token } = JSON.parse(sessionString);
    return token;
  } catch (error) {
    return "";
  }
}

export const saveToken = token => {
  localStorage.setItem('token', JSON.stringify({
    token,
  }));
}

export default {
  retrieveToken,
  saveToken,
};
