const asyncHandler = require("express-async-handler");

exports.create = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  return res.status(200).json({});
});
