const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const APP_SECRET = require("../utils.js");

async function signup(parent, args, context) {
  // password
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: {
      ...args,
      password,
    },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("user does not exist.");
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("password error");
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
}

async function post(parent, args, context) {
  return await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
    },
  });
}
