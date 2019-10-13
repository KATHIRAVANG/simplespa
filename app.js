(function() {
  var elements = document.querySelectorAll("[data-bind]");
  var scope = {};
  elements.forEach(function(element) {
    if (element.type === "text") {
      var proptobind = element.getAttribute("data-bind");
      addScopeProp(proptobind);
      element.onkeyup = function() {
        scope[proptobind] = element.value;
      };
    }

    function addScopeProp(prop) {
      if (!scope.hasOwnProperty(prop)) {
        var value;
        Object.defineProperty(scope, prop, {
          set: function(newValue) {
            value = newValue;
            elements.forEach(function(element) {
              //change value to binded elements
              if (element.getAttribute("data-bind") === prop) {
                if (element.type && element.type === "text") {
                  element.value = newValue;
                } else if (!element.type) {
                  element.innerHTML = newValue;
                }
              }
            });
          },
          get: function() {
            return value;
          },
          enumerable: true
        });
      }
    }
  });

  log = function() {
    Object.keys(scope).forEach(function(key) {
      console.log(key + ": " + scope[key]);
    });
  };

  changeinput1 = function() {
    scope.name = "input 1 changed";
  };
})();
