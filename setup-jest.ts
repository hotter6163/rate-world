import '@testing-library/jest-dom';

const ignoredErrors = [
  /act(...) is not supported in production builds of React, and might not behave as expected./,
];
const consoleError = global.console.error;
global.console.error = (...args) => {
  if (!ignoredErrors.find((el) => el.test(args[0]))) {
    return consoleError(...args);
  }
};
