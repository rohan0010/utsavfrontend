export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.clear();
    next();
  }
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('access_token')) {
    return JSON.parse(localStorage.getItem('access_token'));
  } else {
    return false;
  }
};
