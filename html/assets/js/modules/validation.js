(function() {
  var Validation;
  Validation = (function() {

    var parentErrorclass = "is-invalid";
    var flashErrorClass = "error-flash";
    var validateFormClass = "validate-form";

    var $submitButton = $("." + validateFormClass + "").find("[type=submit]");
    //console.log($submitButton);

    function validateEmail(field) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(field);
    }
    function validateEmpty(field) {
      var emptyRegex = /\w+/;
      return emptyRegex.test(field);
    }

    function errorMessage(text) {
      return '<strong class="' + flashErrorClass + " " + flashErrorClass + '--loaded"><span>&#10006;</span> ' + text +'</strong>';
    }

    function Validation() {
      $submitButton.on('click',function (e) {
        var formHasErrors = 0;
        var $targetForm = $(this).parents("." + validateFormClass + "");
        var $requiredFields = $targetForm.find("input.required, textarea.required, select.required");

        $requiredFields.each(function(){
          var fieldHasNoError = false
          var fieldVal = $(this).val();
          var $thisFieldWrapper = $(this).parent();
          var thisFieldType = $(this).attr("type");
          var thisFieldErrorMsg = $(this).attr("data-error");
          if (thisFieldType == "email") {
            fieldHasNoError = validateEmail(fieldVal);
            //console.log(fieldHasNoError);
            if (thisFieldErrorMsg) {
              $errorMessage = errorMessage(thisFieldErrorMsg);
            }
            else {
              $errorMessage = errorMessage("Please enter a valid email address!");
            }
          } else if (thisFieldType == "checkbox") {  
            if ($(this).is(':checked')) {
              fieldHasNoError = true
            };
            if (thisFieldErrorMsg) {
              $errorMessage = errorMessage(thisFieldErrorMsg);
            }
            else {
              $errorMessage = errorMessage("Please confirm the above before continuing");
            }
          } else {
            fieldHasNoError = validateEmpty(fieldVal);
            if (thisFieldErrorMsg) {
              $errorMessage = errorMessage(thisFieldErrorMsg);
            }
            else {
              $errorMessage = errorMessage("Please complete this field!");
            }
          }

          $thisFieldWrapper.find("." + flashErrorClass + "").remove();
          //console.log(fieldHasError);
          if (fieldHasNoError && fieldVal) {
            $thisFieldWrapper.removeClass(parentErrorclass);           
          } else {
            $thisFieldWrapper.append($errorMessage);
            $thisFieldWrapper.addClass(parentErrorclass);
            formHasErrors = 1;
          }

        });

        // stop the form
        if (formHasErrors) {
          e.preventDefault();
          // animate to top of form
          if ($targetForm.hasClass(validateFormClass + "--reanchor")) {
            var targetFormOffset = $targetForm.offset();
            $('html, body').stop().animate({
              'scrollTop': targetFormOffset.top
            }, 300, 'swing', function () {
             //
            });            
          }
        }

        // remove classes on error for amination
        setTimeout(function() {
          $("." + flashErrorClass + "").removeClass("" + flashErrorClass + "--loaded");
        }, 100);

      }); 
    }

    return Validation;

  })();
  return new Validation();
})();
