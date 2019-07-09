var express = require("express");
var Phim = require("../models/Phim");
var moment = require("moment");

var router = express.Router();

router.get("/", async function (req, res) {
  const phimMoiDuocChieu = await Phim.findAll({
    limit: 4,
    order: [
      ['createdAt', 'ASC']
    ]
  })
  const phim = await Phim.findAll({
    order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ['NgayCongChieu', 'DESC']
    ]
  })
  res.render('index', {phimMoiDuocChieu, phim, moment});
});

router.post('/thongke', async function (req, res) {
  const to = req.body.to
  const go = req.body.go
  res.redirect('/admin/suatchieu');
});

router.get("*", async function (req, res) {
  res.redirect("/");
})

module.exports = router;