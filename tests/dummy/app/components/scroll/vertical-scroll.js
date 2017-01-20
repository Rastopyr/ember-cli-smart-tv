
import Ember from 'ember';
import layout from '../../templates/components/scroll/vertical-scroll';

import WindowFrame from 'ember-cli-smart-tv/components/frame/window-frame';
import ScrollMixin from 'ember-cli-smart-tv/mixins/scroll/vertical';

const { computed, on, inject } = Ember;

export default WindowFrame.extend(ScrollMixin, {
  layout,

  name: 'scroll-window',

  isPaged: false,

  rowNames: computed(function() {
    const rows = [];

    for (let i = 1; i <= 100; i++) {
       rows.push(`row-${i}`);
    }

    return rows;
  }),

  initWindow: on('didRegisterWindow', function() {
    this.get('frameService').activateWindow(this);
  }),
});
