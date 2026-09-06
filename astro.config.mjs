// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { GENERAL_INFO } from './src/data/site';

export default defineConfig({
  output: 'static',
  site: GENERAL_INFO.siteUrl,
  fonts: [
    {
      provider: fontProviders.npm({ remote: false }),
      name: 'Anton',
      cssVariable: '--font-anton',
      weights: [400],
      styles: ['normal'],
      options: { package: '@fontsource/anton', file: 'latin.css' },
    },
    {
      // npm provider can't parse fontsource-variable's format('woff2-variations'), so point at the file directly
      provider: fontProviders.local(),
      name: 'Roboto Flex',
      cssVariable: '--font-roboto-flex',
      options: {
        variants: [
          {
            weight: '100 1000',
            style: 'normal',
            src: ['@fontsource-variable/roboto-flex/files/roboto-flex-latin-wght-normal.woff2'],
          },
        ],
      },
    },
  ],
});
