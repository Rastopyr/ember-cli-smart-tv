/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    outputPaths: {
      app: {
        css: {
          'app': 'dummy.css',
        },
        js: 'dummy.js',
      },
      vendor: {
        css: 'vendor.css',
        js: 'vendor.js',
      },
    },
  });

  var extraAssets = new Funnel('vendor', {
    srcDir: '/',
    include: ['**', '.tproject', '.project'],
    destDir: '/'
  });

  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree(extraAssets);
};
