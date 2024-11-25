// Funzione per settare il tema nel cookie
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);  // Imposta il tema su `html`
    document.cookie = `theme=${theme}; path=/; max-age=${60 * 60 * 24 * 365}`;  // Salva il tema nei cookie per 1 anno
}

// Funzione per leggere il tema dal cookie
function getThemeFromCookie() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('theme='));
    return cookie ? cookie.split('=')[1] : null;
}

// Funzione per determinare il tema preferito dal browser
function getPreferredTheme() {
    if (window.matchMedia) {
        // Controlla il tema del sistema operativo
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        return prefersDarkScheme.matches ? 'dark' : 'light';
    }
    return 'light';  // Default se il matchMedia non è supportato
}

// Leggi il tema dal cookie al caricamento della pagina
const savedTheme = getThemeFromCookie();
if (savedTheme) {
    setTheme(savedTheme);  // Applica il tema salvato

    // Imposta lo stato del checkbox in base al tema salvato
    const checkbox = document.querySelector('.theme-controller');
    if (savedTheme === 'light') {
        checkbox.checked = true;  // Se il tema è "light", imposta il checkbox come checked
    }
} else {
    // Se non esiste un tema salvato nei cookie, imposta il tema in base alla preferenza del browser
    const browserTheme = getPreferredTheme();
    setTheme(browserTheme);
}

// Aggiungi l'evento per il toggle del tema
const checkbox = document.querySelector('.theme-controller');
checkbox.addEventListener('change', function () {
    const theme = checkbox.checked ? 'light' : 'dark';  // Se il checkbox è checked, applica il tema light
    setTheme(theme);  // Salva la preferenza nei cookie
});