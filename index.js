/* jshint node: true */
'use strict';

var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-maybe-import-regenerator',

  included: function(app) {
    this._super.included.apply(this, arguments);

    var hostApp = this._findApp(app);
    this._regeneratorAlreadyIncluded =
      hostApp.__ember_maybe_import_regenerator_included ||
      hostApp.options &&
      hostApp.options.babel &&
      hostApp.options.babel.includePolyfill;

    hostApp.__ember_maybe_import_regenerator_included = true;

    if (!this._regeneratorAlreadyIncluded) {
      hostApp.import('vendor/regenerator-runtime/runtime.js', {
        prepend: true
      });
    }
  },

  treeForVendor: function() {
    var regeneratorRuntimePath = path.dirname(require.resolve('regenerator-runtime'));
    return new Funnel(this.treeGenerator(regeneratorRuntimePath), {
      srcDir: '/',
      destDir: 'regenerator-runtime'
    });
  },

  _findApp: function(hostApp) {
    var app = this.app || hostApp;
    var parent = this.parent;
    while (parent.parent) {
      if (parent.app) {
        app = parent.app;
        break;
      }

      parent = parent.parent;
    }
    return app;
  }
};
