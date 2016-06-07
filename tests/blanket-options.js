/* globals blanket, module */

var options = {
  modulePrefix: 'ember-cli-smart-tv',
  filter: '//.*ember-cli-smart-tv/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    reporters: ['json'],
    autostart: true
  }
};
if (typeof exports === 'undefined') {
  blanket.options(options);
} else {
  module.exports = options;
}
