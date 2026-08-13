import generateToken from "./generateToken.js";

import cookieOptions from "../config/cookieOptions.js";

const sendTokenResponse = (
  user,

  statusCode,

  message,

  res,
) => {
  const token = generateToken(user._id);

  res.cookie(
    "token",

    token,

    cookieOptions,
  );

  res.status(statusCode).json({
    success: true,

    message,

    data: {
      id: user._id,

      name: user.name,

      username: user.username,

      email: user.email,

      avatar: user.avatar,

      role: user.role,
    },
  });
};

export default sendTokenResponse;
