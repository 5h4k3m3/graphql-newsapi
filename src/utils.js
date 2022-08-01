const jwt = require("jsonwebtoken");

APP_SECRET = "GRAPHQL";

function getTokenPayload(token) {
  //get user.id
  return jwt.verify(token, APP_SECRET);
}

function getUserId(request, authToken) {
  if (request) {
    const authHeader = request.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer", "");
      if (!token) {
        throw new Error("no token found");
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(token);
    return userId;
  }
  throw new Error("auth failed");
}

module.exports = {
  APP_SECRET,
  getUserId,
};
