(function() {
  var ModernizrSVG;
  ModernizrSVG = (function() {

    function ModernizrSVG() {
      if(!Modernizr.svg) {
          $('img[src*="svg"]').attr('src', function() {
              return $(this).attr('src').replace('.svg', '.png');
          });
      }
    }

    return ModernizrSVG;

  })();
  return new ModernizrSVG();
})();
