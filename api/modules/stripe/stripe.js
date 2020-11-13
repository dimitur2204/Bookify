const stripe = require('stripe')(process.env.STRIPE_API_SECRET);

const { request } = require('express');
const ErrorResponse = require('../../../utils/error-response');
const asyncHandler = require('../../middleware/asyncHandlers');
const User = require('../../models/user');

const stripeSetup = asyncHandler(async (req,res,next) => {
    const {country} = req.body;
    const user = req.user;
    if(country !== 'BG'){
        return next(new ErrorResponse('Country not supported',400));
    }
    const account = await stripe.accounts.create({
        type:'custom',
        country,
        email:user.email,
        capabilities:{
            card_payments:{
                requested:true
            },
            transfers:{
                requested:true
            },
        }
    });

    //Required update of TOS by Stripe after creating an account
    await stripe.accounts.update(
        account.id,
        {
            tos_acceptance:{
                date: Math.floor(Date.now() / 1000),
                ip: req.ip
            }
        }
    )
    const updated = await  User.findOneAndUpdate(
        {email:user.email},
        {stripeId:account.id},
        {new:true});
    res.send({
        success:true,
        doc:updated
    })
});
module.exports = {
    stripeSetup
}