const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// put book to cart
const mongoose = require("mongoose");

router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    // Validate both ObjectIds
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Error",
        message: "Invalid user ID format",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(bookid)) {
      return res.status(400).json({
        status: "Error",
        message: "Invalid book ID format",
      });
    }

    const userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }

    const isBookinCart = userData.cart.includes(bookid);

    if (isBookinCart) {
      return res.json({
        status: "Success",
        message: "Book is already in cart",
      });
    }

    await User.findByIdAndUpdate(id, {
      $push: { cart: bookid },
    });

    return res.json({
      status: "Success",
      message: "Book added to cart",
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// remove from cart

router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
    try {
      const { bookid } = req.params;
      const { id } = req.headers;
  
      // Validate IDs
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: "Error",
          message: "Invalid user ID format",
        });
      }
  
      if (!mongoose.Types.ObjectId.isValid(bookid)) {
        return res.status(400).json({
          status: "Error",
          message: "Invalid book ID format",
        });
      }
  
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({
          status: "Error",
          message: "User not found",
        });
      }
  
      const isBookInCart = user.cart.includes(bookid);
  
      if (!isBookInCart) {
        return res.status(400).json({
          status: "Error",
          message: "Book is not in cart",
        });
      }
  
      await User.findByIdAndUpdate(id, {
        $pull: { cart: bookid },
      });
  
      return res.json({
        status: "Success",
        message: "Book removed from cart",
      });
  
    } catch (error) {
      console.error("Error:", error.message);
      return res.status(500).json({ status: "Error", message: "Internal server error" });
    }
  });

  //get cart of a particular user

  // get cart of a particular user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
      const userData = await User.findById(id).populate("cart");
      const cart = userData.cart.reverse();
      return res.json({
        status: "Success",
        data: cart,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "An error occurred" });
    }
  });
  


  

  

module.exports =router;