
const AppError = require("../utils/AppError");

const CreateToken = require("../utils/CreateToken");

const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const Admin = require("../models/AdminModel");


exports.register = asyncHandler(async (req, res, next) => {
    const user = await Admin.create(req.body);
    token = CreateToken({ id: user._id, email: user.email });
    res.status(201).json({ data: user, token });
  });
  
  exports.login = asyncHandler(async (req, res, next) => {
    const user = await Admin.findOne({ email: req.body.email });
  
    if (!user) {
      return next(new AppError("user incorrect please try again", 401));
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return next(new AppError("password incorrect please try again", 401));
    }
    delete user._doc.password;
  
    token = CreateToken({ id: user._id, email: user.email });
    res.status(200).json({ data: user, token });
  });
  
  exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new AppError(
          "You are not login, Please login to get access this route",
          401
        )
      );
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
    const currentUser = await Admin.findById(payload.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user that belong to this token does no longer exist",
          401
        )
      );
    }
    req.user = currentUser;
    next();
  });
  