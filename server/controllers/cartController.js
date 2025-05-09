import User from "../models/User.js"

//Update user cart :/api/cart/update
export const updateCart = async (req, res) => {
    try {
      const { cartItems } = req.body;
      const userId = req.user.id;
  
      if (!userId) {
        return res.json({ success: false, message: "User ID missing" });
      }
  
      await User.findByIdAndUpdate(userId, { cartItems });
      res.json({ success: true, message: "Cart updated successfully" });
    } catch (error) {
      console.log("Update cart error:", error.message);
      res.json({ success: false, message: error.message });
    }
  };
  
