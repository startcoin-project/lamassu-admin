(function() {
  var SelectMenu;
  SelectMenu = (function() {

    function SelectMenu() {
      if(!Modernizr.touch) {
        $('.custom-select').customSelectMenu();
      }
    }

    return SelectMenu;

  })();
  return new SelectMenu();
})();
