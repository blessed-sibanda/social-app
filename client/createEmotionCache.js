import createCache from '@emotion/cache';

export default () => {
  return createCache({ key: 'css' });
};
