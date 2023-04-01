import {sep as DIRECTORY_SEPARATOR} from 'path';

export const ___endpoint = (importMetaUrl: string) => {
  const apiDirectory = ['pages', 'api'].join(DIRECTORY_SEPARATOR);
  const baseValue: string = importMetaUrl.split(apiDirectory).pop() ?? '';
  let path: string;
  if (baseValue.endsWith('/index.api.ts')) {
    path = baseValue.replace(/\/index\.api\.ts$/, '');
  } else if (baseValue.endsWith('.api.ts')) {
    path = baseValue.replace(/\.api\.ts$/, '');
  } else {
    path = baseValue.split('/').slice(0, -1).join('/');
  }
  return '/api'.concat(path);
};
