var express = require("express");
var Phim = require('../models/Phim');
var Rap = require('../models/Rap');
var CumRap = require('../models/CumRap');
var User = require('../models/User');
var SuatChieu = require('../models/SuatChieu');
var DatCho = require('../models/DatCho');
var Ve = require('../models/Ve');

var router = express.Router();

router.get("/", async function (req, res) {
  const userid = req.session.userId
  if (!userid) {
    res.redirect('/');
  } else {
    const user = await User.findOne({
      where: {
        id: userid,
      }
    }).then(user => {
      if (user) {
        if (user.Verify == 1 && user.UserType == 1) {
          Ve.findAll({
            include: [{
              model: DatCho,
              include: [{
                model: SuatChieu,
                include: [{
                  model: Phim
                },
                  {
                    model: Rap,
                    include: [{
                      model: CumRap,
                      where: {
                        id: 2
                      }
                    }]
                  }]
              }]
            }]
          }).then(datchos => {
            res.render('indexadmin', {datchos})
          })
        } else {
          res.redirect('/');
        }
      }
    });
  }
});

router.get("/index", async function (req, res) {
  res.render("admin/index");
});

router.get('/phim', async function (req, res, next) {
  const userid = req.session.userId
  if (!userid) {
    res.redirect('/');
  } else {
    const user = await User.findOne({
      where: {
        id: userid,
      }
    }).then(user => {
      if (user) {
        if (user.Verify == 1 && user.UserType == 1) {
          Phim.findAll().then(function (phims) {
            res.render('admin/pages/phim', {phims});
          }).catch(next);
        } else {
          res.redirect('/');
        }
      }
    });
  }
});

router.get('/rap', async function (req, res, next) {
  const userid = req.session.userId
  if (!userid) {
    res.redirect('/');
  } else {
    const user = await User.findOne({
      where: {
        id: userid,
      }
    }).then(user => {
      if (user) {
        if (user.Verify == 1 && user.UserType == 1) {
          Rap.findAll().then(function (raps) {
            res.render('admin/pages/rap', {raps});
          }).catch(next);
        } else {
          res.redirect('/');
        }
      }
    });
  }
});

router.get('/cumrap', async function (req, res, next) {
  const userid = req.session.userId
  if (!userid) {
    res.redirect('/');
  } else {
    const user = await User.findOne({
      where: {
        id: userid,
      }
    }).then(user => {
      if (user) {
        if (user.Verify == 1 && user.UserType == 1) {
          CumRap.findAll().then(function (cumraps) {
            res.render('admin/pages/cumrap', {cumraps});
          }).catch(next);
        } else {
          res.redirect('/');
        }
      }
    });
  }
});

router.get('/user', async function (req, res, next) {
  const userid = req.session.userId
  if (!userid) {
    res.redirect('/');
  } else {
    const user = await User.findOne({
      where: {
        id: userid,
      }
    }).then(user => {
      if (user) {
        if (user.Verify == 1 && user.UserType == 1) {
          User.findAll().then(function (users) {
            res.render('admin/pages/user', {users});
          }).catch(next);
        } else {
          res.redirect('/');
        }
      }
    });
  }
});

router.get('/suatchieu', async function (req, res, next) {
  const userid = req.session.userId
  if (!userid) {
    res.redirect('/');
  } else {
    const user = await User.findOne({
      where: {
        id: userid,
      }
    }).then(user => {
      if (user) {
        if (user.Verify == 1 && user.UserType == 1) {
          SuatChieu.findAll().then(function (suatchieus) {
            res.render('admin/pages/suatchieu', {suatchieus});
          }).catch(next);
        } else {
          res.redirect('/');
        }
      }
    });
  }
});

router.get('/datcho', async function (req, res, next) {
  const userid = req.session.userId
  if (!userid) {
    res.redirect('/');
  } else {
    const user = await User.findOne({
      where: {
        id: userid,
      }
    }).then(user => {
      if (user) {
        if (user.Verify == 1 && user.UserType == 1) {
          DatCho.findAll().then(function (datchos) {
            res.render('admin/pages/datcho', {datchos});
          }).catch(next);
        } else {
          res.redirect('/');
        }
      }
    });
  }
});

router.get('/ve', async function (req, res, next) {
  const userid = req.session.userId
  if (!userid) {
    res.redirect('/');
  } else {
    const user = await User.findOne({
      where: {
        id: userid,
      }
    }).then(user => {
      if (user) {
        if (user.Verify == 1 && user.UserType == 1) {
          Ve.findAll().then(function (ves) {
            res.render('admin//ve', {ves});
          }).catch(next);
        } else {
          res.redirect('/');
        }
      }
    });
  }
});
// router.get("/login", function(req, res){
//     res.render("admin/login");
// });

// router.get("/register", function(req, res){
//     res.render("admin/register");
// });

// router.get("/forgot-password", function(req, res){
//     res.render("admin/forgot-password")
// });

router.get("/404", function (req, res) {
  res.render("admin/pages/404");
});

router.get('/insertphim', async function (req, res) {
  const userid = req.session.userId
  if (!userid) {
    res.redirect('/');
  } else {
    const user = await User.findOne({
      where: {
        id: userid,
      }
    }).then(user => {
      if (user) {
        if (user.Verify == 1 && user.UserType == 1) {
          res.render('insert/insertphim');
        } else {
          res.redirect('/');
        }
      }
    });
  }
});

router.get('/insertcumrap', async function (req, res) {
  const userid = req.session.userId
  if (!userid) {
    res.redirect('/');
  } else {
    const user = await User.findOne({
      where: {
        id: userid,
      }
    }).then(user => {
      if (user) {
        if (user.Verify == 1 && user.UserType == 1) {
          res.render('insert/insertcumrap');
        } else {
          res.redirect('/');
        }
      }
    });
  }
});

router.get('/insertrap', async function (req, res) {
  const userid = req.session.userId
  if (!userid) {
    res.redirect('/');
  } else {
    const user = await User.findOne({
      where: {
        id: userid,
      }
    }).then(user => {
      if (user) {
        if (user.Verify == 1 && user.UserType == 1) {
          res.render('insert/insertrap');
        } else {
          res.redirect('/');
        }
      }
    });
  }
});

router.get('/insertsuatchieu', async function (req, res) {
  const userid = req.session.userId
  if (!userid) {
    res.redirect('/');
  } else {
    const user = await User.findOne({
      where: {
        id: userid,
      }
    }).then(user => {
      if (user) {
        if (user.Verify == 1 && user.UserType == 1) {
          res.render('insert/insertsuatchieu');
        } else {
          res.redirect('/');
        }
      }
    });
  }
});

router.get('/logout', async function (req, res) {
  delete req.session.userId
  res.redirect("/")
});

module.exports = router;