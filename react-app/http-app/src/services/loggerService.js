import * as Sentry from '@sentry/browser';

function init() {
  Sentry.init({dsn: "https://2fc0362443144a188fde6ef7b73ef1a5@sentry.io/1772634"});
}

function log(error) {
  Sentry.captureException(error)
}

export default {
  init,
  log
};