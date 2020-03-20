window.onload = function() {
  let isThemeDark = true;
  let theme = localStorage.getItem('_theme');

  if (!theme) {
    localStorage.setItem('_theme', 'night');
  }

  if (theme === 'day') {
    isThemeDark = false;
    return enableDay(isThemeDark);
  }

  return enableNight(isThemeDark);
};

function toggleTheme(elem) {
  let isThemeDark = true;
  let theme = localStorage.getItem('_theme');

  theme = theme === 'day' ? 'night' : 'day';

  localStorage.setItem('_theme', theme);
  elem.className = theme === 'day' ? 'fas fa-moon' : 'fas fa-sun';

  if (theme === 'day') {
    isThemeDark = false;
    return enableDay(isThemeDark);
  }

  return enableNight(isThemeDark);
}

function enableDay(isThemeDark) {
  if (document.styleSheets[2]) document.styleSheets[2].disabled = !isThemeDark;
}

function enableNight(isThemeDark) {
  if (document.styleSheets[2]) document.styleSheets[2].disabled = !isThemeDark;
}
