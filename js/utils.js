function select(id) {
  let elem = document.getElementById(id);

  if (elem) {
    const option = {
      val: function(newValue = null) {
        if (newValue || newValue === '') {
          return (elem.value = newValue);
        }

        return elem.value;
      },

      hide: function() {
        return elem.classList.add('hide');
      },

      show: function() {
        return elem.classList.remove('hide');
      },

      on: function(action, callback) {
        return elem.addEventListener(action, callback);
      },

      css: function(property, value) {
        return (elem.style[property] = value);
      }
    };

    Object.assign(elem, option);

    return elem;
  }

  return;
}
