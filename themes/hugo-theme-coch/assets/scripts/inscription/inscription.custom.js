(function(window, document) {

  'use strict';

  window.onload = function() {

    var form = document.getElementById('form-inscription'),
        fields = qwery('input,textarea', form),
        submitBtn = document.getElementById('submit-btn'),
        feedbackElemTop = document.getElementById('feedback-top'),
        feedbackElemBottom = document.getElementById('feedback-bottom'),
        feedBackElems = [feedbackElemTop, feedbackElemBottom],
        processingText = document.getElementById('processing-text'),
        submitText = document.getElementById('submit-text'),
        impotsFieldset = document.getElementById('fieldset-impots'),

        userData = {}
    ;
    
    console.log('form dta', formToJSON(form));
    
    window.run = formToJSON;

    bean.on(submitBtn, 'click', function(ev) {
      ev.preventDefault();
      
      updateFeedback('', feedBackElems);

      // do form validation
//      var validation = validateRequiredFields(form);
      var validation = true;

      if (!validation) {
        updateFeedback('Certains champs requis n\'ont pas été remplis. Veuillez remplir tous les champs accompagnés d\'une astérisque.', feedBackElems, 'warning');
      } else {

        // bind the form data to userData
        var userData = formToJSON(form);
        
        startProcessing();

        // submit the user info via API
        nanoajax.ajax({
          url: 'http://localhost:8888/coch-api/index.php/membres_2017_2018',
          method: 'POST',
          cors: true,
          body: JSON.stringify(userData)
        }, function(code, responseText) {
          stopProcessing(form);

          if (code !== 200) {
            // not good
            updateFeedback('Hum... quelque chose ne s\'est pas bien passé. Veuillez réessayer plus tard.', feedbackElemBottom, 'warning');
          } else {
            // positive
            updateFeedback('Merci! Votre inscription a bien été reçue! Vous recevrez bientôt des communications par courriel de notre part.', feedBackElems, 'success');
     
//            nanoajax.ajax({
//              url: 'http://corsaire-chaparal.org/api/mail-notification.php',
//              method: 'POST',
//              cors: true,
//              body:
//              'prenom=' + userData.prenom + '&nom=' + userData.nom + '&annee=' + userData.naissance_annee + '&courriel=' + userData.courriel
//            });
          }
          
          // end of process, hide processing text
          classie.add(processingText, 'none');
        });
      }
    });

    // attach some formatters
    bean.on(form['code_postal'], 'blur', function() {
      if (form['code_postal'].value.length === 6) {
        form['code_postal'].value = [form['code_postal'].value.slice(0,3), form['code_postal'].value.slice(3)].join(' ');
      }
      form['code_postal'].value = form['code_postal'].value.toUpperCase();
    });
    
    bean.on(form['naissance_annee'], 'blur', function() {
      var annee = parseInt(form['naissance_annee'].value);
      
      if (annee < 2000) {
        classie.add(impotsFieldset, 'fieldset-disabled');
      } else {
        if (classie.has(impotsFieldset, 'fieldset-disabled')) {
          classie.remove(impotsFieldset, 'fieldset-disabled');
        }
      }
    });
    // end formatters

    function validateRequiredFields(form) {
      var i;

      for (i = 0; i < form.length; i++) {
        if (form[i].hasAttribute('required') && !form[i].value) {
          return false;
        }
      }

      // special case for checkbox
      if (!form['accept'].checked) {
        return false;
      }

      return true;
    }

    function formToJSON(form) {
      var i, returnedObj = {};

      for (i = 0; i < form.length; i++) {
        if (/\btext|email|select|checkbox|textarea\b/.test(form[i].type)) {

          if (form[i].value) {
            returnedObj[form[i].name] = form[i].value;
          }
        }
      }

      return returnedObj;
    }

    function updateFeedback(feedbackMsg, elements, type) {
      type = type || '';
      var i;

      for (i = 0; i < elements.length; i++) {
        qwery('.feedback-message', elements[i])[0].innerHTML = feedbackMsg;
        if (!feedbackMsg.length) {
          classie.add(elements[i], 'none');
        } else {
          classie.remove(elements[i], 'none');

          if (type === 'warning') {
            classie.remove(elements[i], 'well-primary');
            classie.add(elements[i], 'well-secondary');
          } else if (type === 'success') {
            classie.remove(elements[i], 'well-secondary');
            classie.add(elements[i], 'well-primary');
          } else {
            classie.remove(elements[i], 'well-primary');
            classie.remove(elements[i], 'well-secondary');
          }
        }
      }
    }

    function startProcessing() {
      form['submit-btn'].setAttribute('disabled', '');
      classie.remove(processingText, 'none');
      classie.add(submitText, 'none');
    }

    function stopProcessing() {
      form['submit-btn'].removeAttribute('disabled');
      classie.add(processingText, 'none');
      classie.remove(submitText, 'none');
    }
  };

})(window, document);