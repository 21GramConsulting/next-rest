// This file is executed before all tests.
// It is used to set up the test environment.
// All tests, unit, system, regression, whatever.
// !!!!!

import 'cross-fetch/polyfill';

export default () => {
  console.debug('globalSetup.ts: globalSetup()');
};
