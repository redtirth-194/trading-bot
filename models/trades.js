import mongoose from 'mongoose';

const tradesSchema = new mongoose.Schema({
    setup_name: {
        type: String,
        required: false
    },
   
    indicator: {
        type: String,
        sparse: true,
    },
    time_frame: {
        type: String,
        required: false
    },
    exchange: {
        type: String,
        required: true
    },
     symbol: {
        type: String,
        required: false
    },
    qauntity: {
        type: Number,
    },
     maximum_qauntity: {
        type: Number,
    },
     qauntity_table: {
        type: String,
    },
    trade_direction: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
   createdBy: {
        type: String,
    },
    updatedBy: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    
});

const Trades = mongoose.model('Trades', tradesSchema);
export { Trades };
