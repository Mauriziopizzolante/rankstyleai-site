(() => {
  const storageKey = 'rankstyleai-language';
  const chooseLanguage = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === 'it' || saved === 'en') return saved;
    } catch (_) {}
    return navigator.language.toLowerCase().startsWith('it') ? 'it' : 'en';
  };

  const setLanguage = (language, persist = true) => {
    const selected = language === 'it' ? 'it' : 'en';
    document.documentElement.lang = selected;
    document.querySelectorAll('[data-language-content]').forEach((element) => {
      element.hidden = element.dataset.languageContent !== selected;
    });
    document.querySelectorAll('[data-language-choice]').forEach((button) => {
      const active = button.dataset.languageChoice === selected;
      button.setAttribute('aria-pressed', String(active));
    });
    if (persist) {
      try { localStorage.setItem(storageKey, selected); } catch (_) {}
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-language-choice]').forEach((button) => {
      button.addEventListener('click', () => setLanguage(button.dataset.languageChoice));
    });
    setLanguage(chooseLanguage(), false);
  });
})();
