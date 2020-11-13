(async () => {
    const stripe = require('stripe')('sk_test_51HmiW8JLlnbRmnT5NhfRRsNAGOIEzVxDFdJGvsYnZuHpGqZOWSzDkLSgUeMkFNJHRzLT1dWWCHxyME9mSpIQt4AC00NNH0ZhGP');
    const account = await stripe.account.create({
        type:'standard'
    })
    console.log(account);
})();
