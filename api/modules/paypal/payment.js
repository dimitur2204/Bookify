const ErrorResponse = require("../../../utils/error-response");
const asyncHandler = require("../../middleware/asyncHandlers");
const ShoppingCart = require("../../models/shopping-cart");
const User = require("../../models/user");
const {paypal} = require("./config");


const createPayment = asyncHandler(async(req,res,next) => {
    const cart = await ShoppingCart.findOne({_id:req.user.shoppingCart}).populate('books');
    const totalCost = cart.books.reduce((acc,curr) => {
        acc+= curr.price;
        return acc;
    },0);

    paypal.payment.create(JSON.stringify({
        intent:'sale',
        payer:{
          payment_method:'paypal'
        },
        redirect_urls:{
          return_url:`http://localhost:3001/api/v1/paypal/process`,
          cancel_url:'http://localhost:3001/api/v1/paypal/cancel'
        },
        transactions:[{
          amount:{
            total:totalCost,
            currency:'USD'
          },
          description:'This is the payment for the items in the cart.'
        }]
      }),(err,payment) => {
          if (err) {
              return next(new ErrorResponse(err.message,err.httpStatusCode));
          }
          res.redirect(payment.links.find(l => l.rel === 'approval_url').href);
      })
})

const process = asyncHandler(async (req,res,next) => {
    const paymentId = req.query.paymentId;
    const payerId = { payer_id: req.query.PayerID };
    paypal.payment.execute(paymentId,payerId,async(err,payment) => {
        if (err) {
            return next(new ErrorResponse(err.message,err.httpStatusCode));
        }

        if (payment.state === 'approved') {
            const cart = await ShoppingCart.findOne({user:req.user._id}).populate('books','fullBookId');
            if (cart.books.length <= 0) {
                return next(new ErrorResponse('No books in the cart', 400));
            }
            User.updateOne({_id:req.user._id},{$addToSet:{books:cart.books}});
            const fullBookUrls = await Promise.all(cart.books.map(b => {
                return utils.private_download_url(b.fullBookId,'pdf',{attachment:true,expires_at:new Date().getTime()/1000 * 15 * 60});
            })); 
            cart.books = [];
            await cart.save();
            return res.status(200).json({success:true,doc:fullBookUrls});
        }
        return next(new ErrorResponse('Canceled payment',400));
    })
})

const cancel = (req,res,next) => {
    return next(new ErrorResponse('Canceled payment',400))
}

module.exports = {
    createPayment,
    process,
    cancel
}