import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'overview',
    title: 'Overview',
    type: 'item',
    icon: 'heroicons-outline:home',
    url: 'overview',
  },
  {
    id: 'richlist',
    title: 'Rish List',
    type: 'item',
    icon: 'heroicons-outline:identification',
    url: 'richlist',
  },
];

export default navigationConfig;
