(function(window, document) {

  'use strict';

  window.onload = function() {

    var form = document.getElementById('form-inscription'),
        fields = getFields(),
        clearBtn = document.getElementById('startOver'),
        validateBtn = document.getElementById('validate'),
        warnings = [],
        i, j, k, w
    ;

    clearBtn.onclick = function() {
      if (confirm('Êtes-vous certain de vouloir tout effacer?')) { 
        clearFields(form);

        clearValidation();
      }
    };
    
    validateBtn.onclick = function() {
      validateFields();
    };

    form.onsubmit = function(ev) {
      if (!validateFields()) {
        return false;
      }

      for (k = 0; k < fields.length; k++ ) {
        if (!fields[k].value.length) {
          console.warn('Veuillez remplir tous les champs');
          break;
        }
      }
    };

    function getFields() {
      var ret = [],
          inputs = document.getElementsByTagName('input'),
          textareas = document.getElementsByTagName('textarea');

      ret.concat(Array.prototype.slice.call(inputs));
      ret.concat(Array.prototype.slice.call(textareas));

      return ret;
    }

    function clearFields(context) {
      var fields = qwery('input,textarea', context);

      for (i = 0; i < fields.length; i++) {
        fields[i].value = '';
      }
    }

    function validateFields() {

      var fName = document.getElementById('firstName'),
          lName = document.getElementById('lastName'),
          dob = document.getElementById('dob'),
          address = document.getElementById('address'),
          apt = document.getElementById('apt'),
          email = document.getElementById('email'),
          phone = document.getElementById('telephone'),

          patterns = {
            dob: /^\d{2}-\d{2}-\d{4}$/,
            address: /^[0-9]*,[^,]+,[\w\s]+$/,
            apt: /^\d{1,6}$/,
            email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
            phone: /^(?:\d)?\d{3}-?\d{3}-?(\d{4}(?:\s?\ext:\d{1,6})?)$/
          },

          ret = true;

      function warn(near, message) {
        var elem = document.createElement('small');
        elem.className = 'form-warning text--danger';
        near.parentElement.appendChild(elem);
        elem.innerHTML = message;
        warnings.push(elem);
        ret = false;
      }

      clearValidation();

      if (fName.value.length < 3) {
        warn(fName, 'Le prénom doit comporter au moins 3 caractères.');
        ret = false;
      }
      if (lName.value.length < 3) {
        warn(lName, 'Le nom de famille doit  comporter au moins 3 caractères.');
        ret = false;
      }
      if (!patterns.dob.test(dob.value)) {
        warn(dob, 'La date de naissance doit suivre le format JJ-MM-AAAA.');
        ret = false;
      }
      if (!patterns.address.test(address.value)) {
        warn(address, 'L\'adresse indiquée doit comporter un numéro civique, une rue, ainsi que le nom de la municipalité, séparés par des virgules.');
      }
      if (apt.value.length && !patterns.apt.test(apt.value)) {
        warn(apt, 'Vous devez entrer un numéro comportant de 1 à 6 caractères.');
      }
      if (!patterns.email.test(email.value)) {
        warn(email, 'Veuillez entrer une adresse courriel valide.');
      }
      if (!patterns.phone.test(phone.value)) {
        if (/[\(\)]/.test(phone.value)) {
          warn(phone, 'Veuillez employer la disposition suggérée, c\'est-à-dire sans parenthèses ni d\'espaces.');
        } else { 
          warn(phone, 'Veuillez entrer un numéro de téléphone valide.');
        }
      }

      return ret;
    }

    function clearValidation() {
      // iterate through all the warnings
      for (w = 0; w < warnings.length; w++) {
        warnings[w].parentElement.removeChild(warnings[w]);
      }

      // clear the warnings collection
      warnings = [];
    }
  };

})(window, document);