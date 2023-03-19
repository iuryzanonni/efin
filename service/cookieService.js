const Cookies = require("js-cookie");

exports.createCookie = (props) => {
  const cookie = Cookies.get(props.name);

  if (cookie) {
    Cookies.remove(props.name);
  }

  Cookies.set(props.name, props.value, props.expires);
};

exports.getCookie = (cookie) => {
  return Cookies.get(cookie);
};

exports.deleteCookie = (cookie) => {
  return Cookies.remove(cookie);
};
