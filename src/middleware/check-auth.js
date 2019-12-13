const checkAuth = (request, response, next) => {
  const token = request.headers.authorization;

  if(/ZG0xMjQ6ZG0xMjQ=/.test(token)) {
    next();
  } else {
    const HttpStatusNotAuthorized = 401;
    const errorInfo = {
      status: HttpStatusNotAuthorized,
      message: 'Not authorized'
    };

    response
      .status(HttpStatusNotAuthorized)
      .json(errorInfo);
  }
}
module.exports = checkAuth;