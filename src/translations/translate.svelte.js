let translations = $state.raw({});

export const initTranslations = async (dictionaries = [], locale = 'en-GB') => {
    const [language, country] = locale.split('-');

    let file = 'en';

    if (dictionaries.includes(locale)) {
        file = locale;
    } else if (dictionaries.includes(language)) {
        file = language;
    }

    translations = (await import(`./${file}.json`)).default;
};

export const _ = (key) => {
    if (!translations || !key) return key;

    return translations[key] || key;
};