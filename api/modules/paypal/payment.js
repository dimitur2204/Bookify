const e = require("express");
const ErrorResponse = require("../../../utils/error-response");
const asyncHandler = require("../../middleware/asyncHandlers");
const {paypal,sdk,client} = require("./config");


const createPayment = asyncHandler(async(req,res,next) => {
    paypal.payment.create(JSON.stringify({
        intent:'sale',
        payer:{
          payment_method:'paypal'
        },
        redirect_urls:{
          return_url:'http://localhost:3001/api/v1/paypal/process',
          cancel_url:'http://localhost:3001/api/v1/paypal/cancel'
        },
        transactions:[{
          amount:{
            total:'10',
            currency:'USD'
          },
          description:'This is the payment transaction description.'
        }]
      }),(err,payment) => {
          if (err) {
              return next(new ErrorResponse(err.message,err.httpStatusCode));
          }
          console.log(payment.links.find(l => l.rel === 'approval_url'));
          console.log(payment.links.find(l => l.rel === 'approval_url').href);
          res.redirect(payment.links.find(l => l.rel === 'approval_url').href);
      })
    // const request = new sdk.orders.OrdersCreateRequest();
    // request.prefer("return=representation");
    // request.requestBody({
    //     intent: 'CAPTURE',
    //     purchase_units: [{
    //       amount: {
    //         currency_code: 'USD',
    //         value: '10.00'
    //       },
    //       payee: {
    //         email_address: 'sb-u9fyt3744739@business.example.com'
    //       }
    //     }],
    //     redirect_urls:{
    //         return_url:'http://localhost:3001/api/v1/paypal/process',
    //         cancel_url:'http://localhost:3001/api/v1/paypal/cancel'
    //       }
    //   });
    // const order = await client().execute(request);
    // order.result.links.forEach(link => {
    //     if (link.rel === 'approve') {
    //         console.log(link.href);
    //         return res.redirect(link.href);
    //     }
    // })
})

const process =asyncHandler(async (req,res,next) => {
    const paymentId = req.query.paymentId;
    const payerId = { payer_id: req.query.PayerID };
    paypal.payment.execute(paymentId,payerId,(err,payment) => {
        if (err) {
            return next(new ErrorResponse(err.message,err.httpStatusCode));
        }
        if (payment.state === 'approved') {
            console.log('po burje');
        }else{
            console.log('ebasi mamata');
        }
    })
    // const request = new sdk.orders.OrdersCaptureRequest(orderId);
    // request.requestBody({});
    // const response = await client().execute(request);
    // console.log(object);
    // if (response) {
        
    // }
    //res.redirect('http://localhost:3001/api/v1/cart/checkout')
})

const cancel = (req,res,next) => {
    return next(new ErrorResponse('Canceled payment',400))
}

module.exports = {
    createPayment,
    process,
    cancel
}