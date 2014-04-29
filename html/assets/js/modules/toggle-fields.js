(function() {
  var ToggleFields;
  ToggleFields = (function() {

    var inactiveClass = "is-inactive";

    function disableField(el) {
      el.addClass(inactiveClass);
    }

    function enableField(el) {
      el.removeClass(inactiveClass);
    }

    function selectField(el) {
      $targetToggle = el.parents(".toggle-field");
      enableField($targetToggle);
      $targetToggle.find("input[type=checkbox]").prop("checked", true);
    }

    function toggleField(el) {
      $targetToggle = el.parents(".toggle-field");
      if ($targetToggle.hasClass(inactiveClass)) {
        enableField($targetToggle);
      }
      else {
        disableField($targetToggle); 
      }
    }

    function ToggleFields() {
      $toggleGroups = $(".toggle-field-group");
      $toggleGroups.each(function(){

        $allGroupFields = $(this).find(".toggle-field");
        // Disable on load
        disableField($allGroupFields.not(":eq(0)"));
        // Find elements
        $allCheckboxes = $(this).find("input[type=checkbox]");
        $allInputs = $(this).find("input[type=text]");
        $allSelects = $(this).find(".custom-select-menu, select");
        // When radios change
        $allCheckboxes.change(function(){  
          console.log('change');
          toggleField($(this));
        });
        // When input selected, tick tickbox
        $allInputs.focus(function(){
          selectField($(this));
        });
        // When select selected, tick tickbox
        $allSelects.focus(function(){
          selectField($(this));
        });

      });
    }

    return ToggleFields;

  })();
  return new ToggleFields();
})();
