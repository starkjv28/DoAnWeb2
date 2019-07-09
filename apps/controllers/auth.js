var express = require("express");
var jwt = require("jsonwebtoken");
var moment = require('moment');
var Phim = require('../models/Phim');
var Rap = require('../models/Rap');
var CumRap = require('../models/CumRap');
var User = require('../models/User');
var SuatChieu = require('../models/SuatChieu');
var DatCho = require('../models/DatCho');
var Ve = require('../models/Ve');
var bcrypt = require('bcryptjs');
var validator = require('validator');
var host = require('../mailer/domain');

var router = express.Router();

router.post('/update-password', async (req, res) => {
  const {Old_password, New_password, Confirm_password} = req.body
  const {userId} = req.session
  if (New_password !== Confirm_password) {
    const err = "Mật khẩu xác nhận không khớp"
    return res.render('auth/change_password', {err})
  }
  await User.findOne({
    where: {
      id: userId
    }
  }).then(user => {
    if (user) {
      bcrypt.compare(Old_password, user.Password).then(compare => {
        if (compare) {
          //update password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(New_password, salt, (err, hash) => {

              User.update({
                Password: hash,
              }, {
                where: {
                  id: userId
                }
              }).then(user => {
                const err = "Cập nhật mật khẩu thành công"
                return res.render('auth/change_password', {err})
              })

            })
          })
        } else {
          const err = "Mật Khẩu Cũ Không Khớp"
          return res.render('auth/change_password', {err})
        }
      })
    } else {
      const err = "Người dùng không tồn tại"
      return res.render('auth/change_password', {err})
    }
  })
})

/**
 * @GET_Form_Quản_Lý_pass_word_Profile
 */

router.get('/chang-password', async (req, res) => {
  const {userId} = req.session
  var err = []
  if (userId) {
    res.render('auth/change_password', {err})
  } else {
    res.redirect('/auth/login')
  }
})

router.post('/login', async (req, res) => {
  var err = []
  const {Email, Password} = req.body
  if (!Email) {
    err.push('Email trống')
  }
  if (!Password) {
    err.push('Password trống')
  }
  if (err.length) {
    res.render('auth/login', {err})
  }
  const user = await User.findOne({
    where: {
      Email,
    }
  })
    .then(user => {
      if (user) {
        if (user.Verify == 1) {
          bcrypt.compare(Password, user.Password)
            .then(compare => {
              if (compare) {
                req.session.userId = user.id
                return res.redirect('/')
              } else {
                const err = "Mật khẩu không khớp"
                return res.render('auth/login', {err})
              }
            })
        } else if (user.Verify != 1) {
          const err = "Tài khoản chưa được kích hoạt vui lòng vào mail đã đăng ký kích hoạt tài khoản để đăng nhập"
          return res.render('auth/login', {err})
        }

        if (user.Verify == 1 && user.UserType == 1) {
          req.session.userId = user.id
          return res.redirect('../admin/index')
        }

      } else {
        const err = "Tên đăng nhập không tồn tại"
        res.render('auth/login', {err})
      }
    })
})

/**
 * @Post_login
 */


router.post('/signup', async (req, res) => {
  const {Email, Password, Name, Phone} = req.body

  var errro = []
  if (!Email) {
    errro.push('Email trống')
  }
  if (!Password) {
    errro.push('Password trống')
  }
  if (!Name) {
    errro.push('Tên trống')
  }
  if (!validator.isLength(Password, {min: 4, max: 30})) {
    errro.push('Password phải từ 5 đến 30 ký tự')
  }
  if (!Phone) {
    errro.push('Số Điện Thoại trống')
  }
  if (!validator.isNumeric(Phone)) {
    errro.push('Số Điện Thoại Phải Là Số')
  }
  if (!validator.isLength(Phone, {min: 9, max: 11})) {
    errro.push('Số Điện Thoại Không Hợp Lệ 10 yêu cầu 10 chữ số')
  }
  if (errro.length) {
    return res.render('auth/register', {errro})
  }
  const UserType = 0
  const user = await User.findOne({
    where: {
      Email
    }
  }).then(user => {
    if (user) {
      var errro = "Email đã tồn tại"
      return res.render('auth/register', {errro})
    } else {
      jwt.sign({id: user}, process.env.SECRET, {expiresIn: '48h'}, (err, token) => {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(Password, salt, (err, hash) => {
            const new_user = User.create({
              Email,
              Password: hash,
              Name,
              Phone,
              UserType,
              Verify: 0,
              TokenUser: token
            })
            /**
             * @kich_hoat_tai_khoan
             *khi kich hoat tài khoản set côt kích hoạt 0 -> 1
             khi đăng nhập chập nhận khi phù hợp và đã kích hoạt tài khoản
             */
              //  if(!new_user){
              //   var errro = "Không thể đăng ký"
              //   return res.render('auth/register', {errro})
              //  }
              // console.log("new user",new_user)
            const {verifyEmailUserImplement} = require('../mailer/mailer_user')
            const link = host.domain + '/auth/verify?token=' + token
            verifyEmailUserImplement(Email, link)
            //check mail ban ơi
            res.render('auth/checkmail')
          })
        })
      })
    }
  })
})

/**
 * @Post_sign_up
 */

router.get('/delete/:id', async (req, res) => {
  const {id} = req.params
  await User.destroy({
    where: {
      id
    }
  }).then(user => {
    res.json(user)
  })
})

/**
 * @Xoá_User
 */


router.get('/verify', async (req, res, next) => {
  const {token} = req.query
  await User.update({
    Verify: 1
  }, {
    where: {
      TokenUser: token
    }
  }).then(user => {
    const err = "Kích hoạt tài khoản thành công"
    return res.render('auth/login', {err})
  })
})

/**
 * @Get_Verify
 */

router.get('/quen-mat-khau', async (req, res) => {
  var err = []
  res.render('auth/forgot', {err})
})


/**
 *@Post_Quên_Mật_Khẩu
 */
router.post('/quen-mat-khau', async (req, res) => {
  const {Email} = req.body
  await User.findOne({
    where: {
      Email
    }
  }).then(user => {
    if (user) {
      const {sendMailForgetPassword} = require('../../mailer/mailer_user')

      const link = host.domain + '/auth/cap-nhat-mat-khau?token=' + user.TokenUser
      sendMailForgetPassword(user.Email, user.Name, link)
      res.render('auth/mail_forget')

    } else {
      const err = "Email không tồn tại"
      res.render('auth/forgot', {err})
    }
  })
})

/**
 * @Đổi_Mật_Khẩu
 */
router.get('/cap-nhat-mat-khau', async (req, res) => {
  const {token} = req.query
  var err = []
  if (!token) {
    return res.redirect('/auth/login')
  }
  return res.render('auth/update_password', {err, token: token})
})

/**
 * @Post_Đổi_mật_khẩu
 */
router.post('/cap-nhat-mat-khau/:token', async (req, res) => {
  const {token} = req.params
  const {Password, XacNhan_Password} = req.body

  if (!Password && XacNhan_Password) {
    return res.redirect(`/auth/cap-nhat-mat-khau?token=${token}`)
  }
  if (Password !== XacNhan_Password) {
    // const err = "Mật Khẩu Không Khớp"
    return res.redirect(`/auth/cap-nhat-mat-khau?token=${token}`)
  }
  await bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(XacNhan_Password, salt, (err, hash) => {

      User.update({
        Password: hash,
      }, {
        where: {
          TokenUser: token
        }
      }).then(user => {
        res.redirect('/auth/login')
      })
    })
  })
})

router.get('/logout', async (req, res) => {
  delete req.session.userId
  res.redirect("/")
})

router.get('/register', async function (req, res) {
  var errro = []
  // const errors = null
  res.render('auth/register', {errro});
});

router.get('/login', async function (req, res) {
  var err = []

  // var error = []
  res.render('auth/login', {err});
});

router.get('/forgot', async function (req, res) {
  res.render('auth/forgot');
});

/**
 * @Update_Profile
 */
router.post('/update', async (req, res) => {
  const {Email, Name, Phone} = req.body
  const {userId} = req.session
  await User.update({
    Email, Name, Phone
  }, {
    where: {
      id: userId
    }
  }).then(user => {
    res.redirect(`/auth/profile?id=${userId}`)
  })
})

/**
 * @Quản_Lý_Lịch_Sử
 */
router.get('/profile', async function (req, res, next) {
  const {id} = req.query

  if (id != req.session.userId) {
    return res.redirect('/')
  } else {
    User.findOne({
      where: {
        id: id
      }
    }).then(function (users) {
      // const { userId } = req.session
      Ve.findAll({
        include: [{
          model: DatCho,
          where: {
            UserId: req.session.userId
          },
          include: [{
            model: SuatChieu,
            include: [{
              model: Phim
            },
              {
                model: Rap,
                include: [{
                  model: CumRap
                }]
              }]
          }]
        }]
      }).then(user => {
        // res.render("auth/profile", {user, moment})

        res.render('auth/profile', {users, user, moment});
      })
    }).catch(next);
  }
});

router.get('/404', async function (req, res) {
  res.render('auth/404');
});

module.exports = router