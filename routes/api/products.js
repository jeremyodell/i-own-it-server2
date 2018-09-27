var router = require("express").Router();
var auth = require("../auth");
const db = require("../../db");

router.get("/report", function(req, res, next) {
  var selectStatement = 'SELECT * FROM "Products"';
  db.query(selectStatement)
    .then(result => {
      console.log("here is th result ", result);
      return res.json(result);
    })
    .catch(e => {
      console.error(e.stack);
      res.json({ message: "unabel to save user", user: user });
      return res.status(500);
    });
});
router.post("/", auth.required, function(req, res, next) {
  query = {
    text:
      'UPDATE "Products" set "Quantity" = $1, "Price" = $2, "Timestamp" = $3, "Product_name" = $4 where "Id" = $5',
    values: [
      req.body.quantity,
      req.body.price,
      req.body.timestamp,
      req.body.productName,
      req.body.id,
    ]
  };

  db.query(query)
    .then(result => {
      console.log("here is the save of a product", result);
      res.json({message: "save of product a sucess"});
      res.status(200);
      return res;
    })
    .catch(e => {
      console.error("error ", e);
      res.json({ message: "unable to save product " });
      res.status(500);
      return res;
    });
});

module.exports = router;
