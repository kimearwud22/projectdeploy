import { prisma } from "../../../libs/prisma.libs";

export default function handler(req, res) {
  const { name, username, password } = req.body;
  const new_userdata = {
    name: name,
    username: username,
    password: password,
  };
  
  prisma.user.create ({
    data: new_userdata,
  })
    .then((user) => {
      res.status(201).json({
        message: "User created successfully!",
        data: user,
      });
    })
    .catch((error) => {
      res.status(200).json({
        message: error //|| "Error occured! Please contact the admin for more information.",
      });
    }
  );
}