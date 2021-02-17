    // Replace with your own publishable key: https://dashboard.stripe.com/test/apikeys
    var PUBLISHABLE_KEY = 'pk_live_51IEbYeB9YJ6A11E39xWcT1HtJ7nDO7HgiiApKZX5QBW5WjWNN2RdrEaSVTVUrrvdX9lsGNFj3g4q5HPDYJaGf3T500UAXJfma9';
    // Replace with the domain you want your users to be redirected back to after payment
    var DOMAIN = location.href.replace(/[^/]*$/, '');

    if (PUBLISHABLE_KEY === 'pk_test_Tr8olTkdFnnJVywwhNPHwnHK00HkHV4tnP') {
      console.log(
        'Replace the hardcoded publishable key with your own publishable key: https://dashboard.stripe.com/test/apikeys'
      );
    }

    var stripe = Stripe(PUBLISHABLE_KEY);

    // Handle any errors from Checkout
    var handleResult = function (result) {
      if (result.error) {
        var displayError = document.getElementById('error-message');
        displayError.textContent = result.error.message;
      }
    };

    document.querySelectorAll('.btn-checkout').forEach(function (button) {
      button.addEventListener('click', function (e) {
        var mode = e.target.dataset.checkoutMode;
        var priceId = e.target.dataset.priceId;
        var items = [{ price: priceId, quantity: 1 }];

        // Make the call to Stripe.js to redirect to the checkout page
        // with the sku or plan ID.
        stripe
          .redirectToCheckout({
            mode: mode,
            lineItems: items,
            successUrl:
              DOMAIN + 'success.html?session_id={CHECKOUT_SESSION_ID}',
            cancelUrl:
              DOMAIN + 'index.html',
          })
          .then(handleResult);
      });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });