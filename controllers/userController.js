const db = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const otpgenerator = require("otp-generator");
const mailjet = require("../notification/Mailjet")




exports.SignUpUsers = async (req, res) => {
  const allusers = await User.find();
  const exist = allusers?.find((item) => item.email === req.body.email);
  try {
    if (!exist) {
      const otp = otpgenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      const user = await User.create({
        ...req.body,
        otp: otp,
        isVerified: false,
        isAdmin: false,
      });
      const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: "olawaleadeit@gmail.com",
                Name: "StoreBackend"
              },
              To: [
                {
                  Email: user.email,
                  Name:user.name
                }
              ],
              Subject: `Welcome  ${user.email} to the StoreBackend`,
              TextPart: `Dear ${user.name} use this 4 digit otp token to complete your registration`,
              
              HTMLPart: `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP Email Template</title>
              </head>
              <body>
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #333333;">Your One-Time Password (OTP)</h2>
                    <p style="color: #555555;">Your OTP is: <strong style="color: #007bff;">${otp}</strong></p>
                    <p style="color: #555555;">This OTP is valid for a single use and should not be shared with others.</p>
                    <div style="margin-top: 20px; color: #777777;">
                      <p>If you did not request this OTP or have any concerns, please contact support.</p>
                    </div>
                  </div>
                </div>
              </body>
              </html>
              `
            }
          ]
        })



      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          password: user.password,
          id: user._id,

        },
        "d1CpSArCGc2fYw1VZ7uxG",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "success",
        data: {
          name: user.name,
          email: user.email,
        
          _id: user._id,
          isVerified: user.isVerified,
          isAdmin: user.isAdmin,
        },
        token: token,
      });
    } else {
      res.status(500).json({ message: "error", error: "User already exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "error", data: error });
  }
};
exports.SignUpAdmin = async (req, res) => {
  const allusers = await User.find();
  const exist = allusers?.find((item) => item.email === req.body.email);
  try {
    if (!exist) {
      const otp = otpgenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      const user = await User.create({
        ...req.body,
        otp: otp,
        isVerified: false,
        isAdmin: true,
      });

      const token = jwt.sign(
        {
        
          id: user._id,
        },
        "d1CpSArCGc2fYw1VZ7uxG",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "success",
        data: user,
        token: token,
      });
    } else {
      res.status(500).json({ message: "error", error: "User already exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "error", data: error });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = jwt.verify(
      req.headers.authorization.split(" ")[1],
      "d1CpSArCGc2fYw1VZ7uxG"
    );

    const userDetails = await User.findById(user.id);
    if (userDetails != null) {
      res.status(200).json({ message: "success", data: userDetails });
    } else {
      res.status(500).json({ message: "error", error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "error", error: error });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const user = await User.find({
      email: req.body.email,
      password: req.body.password,
    });

    if (user.length > 0) {
        const token = jwt.sign(
            {
            
              id: user[0]?._id,
            },
            "d1CpSArCGc2fYw1VZ7uxG",
            { expiresIn: "1h" }
          );
          if(user[0]?.isVerified) {
            res.status(200).json({
              message: "success",
              data: user[0],
              token: token,
            });
          }
          else{

            res.status(200).json({
              message: "success",
              data: user[0],
              token: token,
            });
            this.ResendOtp()
          }
    } else {
      res.status(500).json({ message: "error", error: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error,
    });
  }
};

exports.VerifyOtp = async (req, res) => {
  const update = { $unset: { otp: 1 } };
  try {
    const userData = jwt.verify(
      req.headers.authorization.split(" ")[1],
      "d1CpSArCGc2fYw1VZ7uxG"
    );
    const user = await User.findByIdAndUpdate(userData.id, update, {});

    if (user.otp == req.params.otp) {
      user.isVerified = true;

      user.save();
      this.getCurrentUser(req, res);
    } else {
      res.status(500).json({ message: "error", error: "Invalid Otp" });
    }
  } catch (error) {
    res.status(500).json({ message: "error", error: error });
  }
};

exports.ResendOtp = async (req, res) => {
  try {
    const otp = otpgenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    const update = { otp: otp, isVerified: false };
const userData =await User.findOne({email: req.body.email})
  

    const user = await User.findByIdAndUpdate(userData._id, update, {
      new: true,
      runValidators: true,
    });
    const request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: "olawaleadeit@gmail.com",
            Name: "StoreBackend"
          },
          To: [
            {
              Email: user.email,
              Name:user.name
            }
          ],
          Subject: `Welcome  ${user.email} to the StoreBackend`,
          TextPart: `Dear ${user.name} use this 4 digit otp token to complete your registration`,
          
          HTMLPart: `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Email Template</title>
          </head>
          <body>
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
              <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333333;">Your One-Time Password (OTP)</h2>
                <p style="color: #555555;">Your OTP is: <strong style="color: #007bff;">${otp}</strong></p>
                <p style="color: #555555;">This OTP is valid for a single use and should not be shared with others.</p>
                <div style="margin-top: 20px; color: #777777;">
                  <p>If you did not request this OTP or have any concerns, please contact support.</p>
                </div>
              </div>
            </div>
          </body>
          </html>
          `
        }
      ]
    })
    this.getCurrentUser(req, res);
  } catch (error) {
    res.status(500).json({ message: "error", error: error });
  }
};
exports.forgottenPassword = async(req,res)=>{
  const otp = otpgenerator.generate(4,({lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false}))
  try {
    const user = await User.findOneAndUpdate({email: req.body.email},{otp:otp},{new:true})
    if(res){
      const request = mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: "olawaleadeit@gmail.com",
              Name: "StoreBackend"
            },
            To: [
              {
                Email: user.email,
                Name:user.name
              }
            ],
            Subject: `Welcome  ${user.email} to the StoreBackend`,
            TextPart: `Dear ${user.name} use this 4 digit otp token to complete your registration`,
            
            HTMLPart: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>OTP Email Template</title>
            </head>
            <body>
              <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                  <h2 style="color: #333333;">Your One-Time Password (OTP)</h2>
                  <p style="color: #555555;">Your OTP is: <strong style="color: #007bff;">${otp}</strong></p>
                  <p style="color: #555555;">This OTP is valid for a single use and should not be shared with others.</p>
                  <div style="margin-top: 20px; color: #777777;">
                    <p>If you did not request this OTP or have any concerns, please contact support.</p>
                  </div>
                </div>
              </div>
            </body>
            </html>
            `
          }
        ]
      })
      res.status(200).json({
        message:`a reset otp token have been sent to ${req.body.email}`,
        data:null
      })
    }
    else{
      res.status(404).json({
        message:" user not found",
        error:null
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      error: error
    })
  }
}