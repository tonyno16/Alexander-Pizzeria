(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var forms = document.querySelectorAll('[data-validate]');

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        var isValid = true;
        var firstError = null;

        // Clear previous errors
        form.querySelectorAll('.form-error').forEach(function (el) {
          el.remove();
        });
        form.querySelectorAll('.error').forEach(function (el) {
          el.classList.remove('error');
        });

        // Validate required fields
        form.querySelectorAll('[required]').forEach(function (field) {
          var value = field.value.trim();
          var errorMsg = '';

          if (!value) {
            errorMsg = 'Questo campo e obbligatorio';
            isValid = false;
          } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errorMsg = 'Inserisci un indirizzo email valido';
            isValid = false;
          } else if (field.type === 'tel' && !/^[\+]?[\d\s\-\(\)]{7,}$/.test(value)) {
            errorMsg = 'Inserisci un numero di telefono valido';
            isValid = false;
          }

          if (errorMsg) {
            field.classList.add('error');
            var errorEl = document.createElement('span');
            errorEl.className = 'form-error';
            errorEl.textContent = errorMsg;
            field.parentNode.appendChild(errorEl);

            if (!firstError) {
              firstError = field;
            }
          }
        });

        // Validate file upload (if present)
        var fileInput = form.querySelector('input[type="file"]');
        if (fileInput && fileInput.files.length > 0) {
          var file = fileInput.files[0];
          var allowedTypes = ['application/pdf', 'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
          var maxSize = 5 * 1024 * 1024; // 5MB

          if (allowedTypes.indexOf(file.type) === -1) {
            var errorEl = document.createElement('span');
            errorEl.className = 'form-error';
            errorEl.textContent = 'Formato file non supportato. Usa PDF, DOC o DOCX.';
            fileInput.parentNode.appendChild(errorEl);
            isValid = false;
            if (!firstError) firstError = fileInput;
          } else if (file.size > maxSize) {
            var errorEl2 = document.createElement('span');
            errorEl2.className = 'form-error';
            errorEl2.textContent = 'Il file deve essere inferiore a 5MB.';
            fileInput.parentNode.appendChild(errorEl2);
            isValid = false;
            if (!firstError) firstError = fileInput;
          }
        }

        // Validate checkbox consent
        var consent = form.querySelector('[data-consent]');
        if (consent && !consent.checked) {
          var errorEl3 = document.createElement('span');
          errorEl3.className = 'form-error';
          errorEl3.textContent = 'Devi accettare l\'informativa sulla privacy';
          consent.parentNode.appendChild(errorEl3);
          isValid = false;
          if (!firstError) firstError = consent;
        }

        if (!isValid) {
          e.preventDefault();
          if (firstError) {
            firstError.focus();
          }
        }
      });

      // Remove error on input
      form.addEventListener('input', function (e) {
        if (e.target.classList.contains('error')) {
          e.target.classList.remove('error');
          var nextError = e.target.parentNode.querySelector('.form-error');
          if (nextError) nextError.remove();
        }
      });
    });
  });
})();
