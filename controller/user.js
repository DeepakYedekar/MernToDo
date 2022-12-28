const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require('../DB/user');

const Register=async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
    let user =await User.findOne({ email: email })
    if (user) {
        res.status(400).json({ msg: "User already exists" });
    } else {
        const hash = await bcrypt.hash(password, 10);
        const new_user = new User({ name, email, password: hash });
        new_user.save().then((user) => {
            jwt.sign({ id: user.id }, process.env.SECRATE, { expiresIn: '1h' },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({token,user: { id: user.id, name: user.name, email: user.email }});
                })
        });
    }
};


const signin=async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter both an email and a password" });
  }
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "User does not exist" });
    }
    const matching = await bcrypt.compare(password, user.password);
      if (!matching) {
        res.status(400).json({ msg: "Invalid credentials" });
      } else {
        jwt.sign({ id: user.id },process.env.SECRATE,{ expiresIn: '1h' },
          (err, token) => {
            if (err) {
              throw err;
            }
            res.json({token,user: { id: user.id, name: user.name, email: user.email } });
          });
    }
};

// router.get("/user", auth, (req, res) => {
//   // auth middleware adds user id to req
//   User.findById(req.user.id)
//     .select("-password")
//     .then((user) => res.json(user));
// });

module.exports = {
  Register,
  signin
}