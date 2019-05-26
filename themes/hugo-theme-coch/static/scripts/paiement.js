(function () {
  'use strict';

  /**
   * PAIEMENT INSCRIPTION
   * 
   * steps:
   * 1. Gather contact input (name and email) and amount.
   * 2. Stripe Elements
   * 2.1. Gather credit card information to generate a token from Stripe.
   * 2.2. Retrieve the Stripe token.
   * 3. Checkout (pay) with token, amount and contact info.
   */

  // Setup amount to pay here
  var amountToPay = 0;

  var paymentContainer = document.querySelector('.paiement-inscription');
  var paymentForm = paymentContainer.querySelector('form');

  var fieldsetStep1 = document.getElementById('fieldset-step-1');
  var fieldsetStep2 = document.getElementById('fieldset-step-2');

  var continueBtn = document.getElementById('btn-step-1');
  var resetBtn = document.getElementById('reset-btn');
  var submitBtn = document.getElementById('submit-btn');

  var amountField = document.getElementById('paiement-inscription-amount');


  setupContactInfo();
  setupStripeElements();

  /**
   * STEP 1: Gather contact info & amount
   */

  function setupContactInfo() {
    continueBtn.addEventListener('click', function (ev) {
      ev.preventDefault();

      var inputsStep1 = fieldsetStep1.querySelectorAll('input');
      var plainInputsValid = true;

      Array.prototype.forEach.call(inputsStep1, function (input) {
        if (input.checkValidity && !input.checkValidity()) {
          plainInputsValid = false;
          return;
        }
      });

      if (!plainInputsValid) {
        triggerBrowserValidation(paymentForm);
      } else {
        var amount = amountField.value;

        amount = formatAmount(amount);

        fieldsetStep1.setAttribute('disabled', true);
        fieldsetStep2.classList.remove('none');
        setAmount(amount);

        //      fieldsetStep2.scrollIntoView({
        //        behavior: 'smooth'
        //      });
        Velocity(fieldsetStep2, 'scroll', {
          duration: 600,
          delay: 100, // Leave small delay for rendering the shown element
          easing: [0.19, 1, 0.22, 1] // ease-in-out quart
        });
      }

    });

    /**
     * Go back to edit contact info
     */
    resetBtn.addEventListener('click', function (ev) {
      ev.preventDefault();

      goToStep1();
    });
  }

  /**
   * STEP 2: Stripe Elements
   */
  function setupStripeElements() {

    // Create a new stripe instance with the publishable key
    var stripe = Stripe('pk_live_ccR6ujsv04d7TjBjRvVBgFvn');

    var elements = stripe.elements({
      // Stripe's examples are localized to specific languages, but if
      // you wish to have Elements automatically detect your user's locale,
      // use `locale: 'auto'` instead.
      locale: 'fr-CA'
    });

    var elementStyles = {
      base: {
        color: '#212721',
        fontWeight: 400,
        fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
        fontSize: '14px',
        fontSmoothing: 'antialiased',

        '::placeholder': {
          color: '#B2B4B8',
        },
        ':-webkit-autofill': {
          color: '#e39f48',
        },
      },
      invalid: {
        color: '#f21a29',

        '::placeholder': {
          color: '#B2B4B8',
        },
      },
    };

    var elementClasses = {
      focus: 'focused',
      empty: 'empty',
      invalid: 'invalid',
    };

    var card = elements.create('card', {
      iconStyle: 'solid',
      style: elementStyles,
      classes: elementClasses
    });
    card.mount('#card');

    registerElements([card], 'paiement-inscription');

    function registerElements(elements, exampleName) {

      var resetButton = paymentContainer.querySelector('a.reset-btn');
      var error = paymentContainer.querySelector('.form-error');
      var errorMessage = error.querySelector('.message');

      // Listen for errors from each Element, and show error messages in the UI.
      var savedErrors = {};
      elements.forEach(function (element, idx) {
        element.on('change', function (event) {
          if (event.error) {
            error.classList.add('visible');
            savedErrors[idx] = event.error.message;
            errorMessage.innerText = event.error.message;
          } else {
            savedErrors[idx] = null;

            // Loop over the saved errors and find the first one, if any.
            var nextError = Object.keys(savedErrors)
              .sort()
              .reduce(function (maybeFoundError, key) {
                return maybeFoundError || savedErrors[key];
              }, null);

            if (nextError) {
              // Now that they've fixed the current error, show another one.
              errorMessage.innerText = nextError;
            } else {
              // The user fixed the last error; no more errors.
              error.classList.remove('visible');
            }
          }
        });
      });

      // Listen on the form's 'submit' handler...
      paymentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Trigger HTML5 validation UI on the form if any of the inputs fail
        // validation.
        var plainInputsValid = true;
        Array.prototype.forEach.call(paymentForm.querySelectorAll('input'), function (
          input
        ) {
          if (input.checkValidity && !input.checkValidity()) {
            plainInputsValid = false;
            return;
          }
        });
        if (!plainInputsValid) {
          triggerBrowserValidation(paymentForm);
          return;
        }

        // Show a loading screen...
        paymentContainer.classList.add('submitting');

        // Disable all inputs.
        disableInputs(paymentForm);

        fieldsetStep2.setAttribute('disabled', true);

        // Gather additional customer data we may have collected in our form.
        var additionalData = {};

        paymentContainer.classList.add('submitted');

        // Use Stripe.js to create a token. We only need to pass in one Element
        // from the Element group in order to create a token. We can also pass
        // in the additional customer data we collected in our form.
        stripe.createToken(elements[0], additionalData).then(function (result) {

          if (result.token) {
            // The crucial step: make the payment
            submitToken(result.token);
          } else {
            // Otherwise, un-disable inputs.
            enableInputs(paymentForm);
            
            // Stop loading
            paymentContainer.classList.remove('submitting');
            paymentContainer.querySelector('.form-error').classList.remove('none');
            paymentContainer.querySelector('.form-success').classList.add('none');

            fieldsetStep2.removeAttribute('disabled');
            console.error('Error retrieving a Stripe token.');
          }
        }, function (err) {
          
          // Stop loading
          paymentContainer.classList.remove('submitting');
          console.error('Error creating a Stripe token.', err);
        });
      });

      //    resetButton.addEventListener('click', function(e) {
      //      e.preventDefault();
      //      // Resetting the form (instead of setting the value to `''` for each input)
      //      // helps us clear webkit autofill styles.
      //      paymentForm.reset();
      //
      //      // Clear each Element.
      //      elements.forEach(function(element) {
      //        element.clear();
      //      });
      //
      //      // Reset error state as well.
      //      error.classList.remove('visible');
      //
      //      // Resetting the form does not un-disable inputs, so we need to do it separately:
      //      enableInputs(paymentForm);
      //      paymentContainer.classList.remove('submitted');
      //    });
    }
  }

  function enableInputs() {
    Array.prototype.forEach.call(
      paymentForm.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='tel']"
      ),
      function (input) {
        input.removeAttribute('disabled');
      }
    );
  }

  function disableInputs() {
    Array.prototype.forEach.call(
      paymentForm.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='tel']"
      ),
      function (input) {
        input.setAttribute('disabled', 'true');
      }
    );
  }

  function triggerBrowserValidation() {
    // The only way to trigger HTML5 form validation UI is to fake a user submit
    // event.
    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.style.display = 'none';
    paymentForm.appendChild(submit);
    submit.click();
    submit.remove();
  }
  
  function goToStep1() {
    fieldsetStep1.removeAttribute('disabled');
    fieldsetStep2.classList.add('none');
    //    fieldsetStep1.scrollIntoView({
    //      behavior: 'smooth'
    //    });
    Velocity(fieldsetStep1, 'scroll', {
      duration: 600,
      delay: 100, // Leave small delay for rendering the shown element
      easing: [0.19, 1, 0.22, 1] // ease-in-out quart
    });
  }

  /**
   * Format the amount to be in the form of 123,00
   * (with proper decimals separated by a comma).
   * Expects a string (or number) input, without the currency,
   * with or without a decimal separator ('.' or ',')
   * @param   {string} input string
   * @returns {string} Formatted string
   */
  function formatAmount(input) {
    // If is number, make string
    if (typeof input === 'number') {
      input = input.toString();
    }

    var inputLen = input.length;

    if (!inputLen) {
      conosle.error('Amount has no lenght.', input);
      return;
    }

    input = input.replace(/[\$\s]/g, '');

    input = input.replace(/(\.|,)/i, ',');

    if (input.indexOf(',') === -1) {
      input = input + ',00';
    } else if (input.indexOf(',') === inputLen - 2) {
      // Missing one digit
      input = input + '0';
    }

    return input;
  }

  /**
   * Set the amount to pay
   * @param {string} amount Formatted amount (in the form of 123,50)
   */
  function setAmount(amount) {
    amountToPay = amount;

    submitBtn.querySelector('.amount').innerText = amount + ' $';
  }

  /**
   * 
   * @param   {string} input Amount string with comma decimal separator
   * @returns {number} Number without decimal separator (ex. 123,50 => 12350)
   */
  function stripDecimalSeparator(input) {
    return parseInt(input.replace(',', ''));
  }

  /**
   * Submit token, amount and contact info to attempt payment
   * 
   * @param {object} token Stripe token retrieved from credit card info
   */
  function submitToken(token) {
    var submitAmount = stripDecimalSeparator(amountToPay);
    var submitFirstName = fieldsetStep1.querySelector('#paiement-inscription-firstname').value;
    var submitLastName = fieldsetStep1.querySelector('#paiement-inscription-lastname').value;
    var submitEmail = fieldsetStep1.querySelector('#paiement-inscription-email').value;

    nanoajax.ajax({
      url: 'https://api.corsaire-chaparral.org/v1/payment/new',
      method: 'POST',
      cors: true,
      body: 'stripeToken=' + token.id +
        '&amount=' + submitAmount +
        '&firstName=' + submitFirstName +
        '&lastName=' + submitLastName +
        '&email=' + submitEmail +
        '&category=inscription2018-2019'

    }, function (code) {
      // Stop loading!
      paymentContainer.classList.remove('submitting');

      if (code === 200) {

        fieldsetStep1.classList.add('none');
        fieldsetStep2.classList.add('none');

        paymentContainer.querySelector('.form-success').classList.remove('none');
        paymentContainer.querySelector('.form-error').classList.add('none');

        Velocity(
          paymentContainer,
          'scroll',
          {
            duration: 1000,
            easing: [0.19, 1, 0.22, 1], // ease-in-out quart
            offset: -150
          });
//        paymentContainer.querySelector('.form-success').scrollIntoView({
//          behavior: 'smooth'
//        });
      } else {
        document.querySelector('.form-success').classList.add('none');
        document.querySelector('.form-error').classList.remove('none');

        enableInputs();
        
        fieldsetStep1.removeAttribute('disabled');
        fieldsetStep2.removeAttribute('disabled');

        goToStep1();
      }
    });
  }

})();
