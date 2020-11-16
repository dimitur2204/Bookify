const ErrorResponse = require("../../../utils/error-response");
const asyncHandler = require("../../middleware/asyncHandlers");
const ShoppingCart = require("../../models/shopping-cart");
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
          return_url:`http://localhost:3001/api/v1/paypal/process?authToken=${req.user.getSignedJwtToken()}`,
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
    paypal.payment.execute(paymentId,payerId,(err,payment) => {
        if (err) {
            return next(new ErrorResponse(err.message,err.httpStatusCode));
        }
        if (payment.state === 'approved') {
            res.redirect('http://localhost:3001/api/v1/cart/checkout');
            return;
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