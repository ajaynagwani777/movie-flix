import 'i18next';
import { arStrings, enStrings } from './utils/strings';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: 'enStrings';
    // custom resources type
    resources: {
      ns1: typeof enStrings;
      ns2: typeof arStrings;
    };
  }
}

