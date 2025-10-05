import { Trades } from "../../models/trades";
import { User } from "../models/users.js";

export const createTrade = async (req, res) => {
  const user = await User.findById(req.user.id);

  const {
    setup_name,
   
    indicator,
    time_frame,
    exchange,
     symbol,
    qauntity,
     maximum_qauntity,
     qauntity_table,
    trade_direction,
    user_id,
  } = req.body;

  const createdBy = user.id;

  try {

        // Create a new Trade


      const newUser = await Trades.create({
        setup_name: setup_name,
   
    indicator : indicator,
    time_frame : time_frame,
    exchange : exchange,
     symbol : symbol,
    qauntity : qauntity,
     maximum_qauntity : maximum_qauntity,
     qauntity_table : qauntity_table,
    trade_direction : trade_direction,
    user_id : user_id,
      });

      // Send confirmation email

      
      // Send success response

      return res.status(200).json({
        status: 1,

        message: "Trade created successfully",

        data: newUser,
      });
    
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: 0,

      message: "An error occurred while creating the Trade",

      error: error.message,
    });
  }
};