import User from "./models/User";

export default async () => {
  const exisitng = await User.findOne({ username: process.env.ADMIN_USERNAME });
  if (exisitng) return console.log("Admin already exists");
  await new User({
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    isAdmin: true,
  }).save();
  console.log("Admin created");
};
