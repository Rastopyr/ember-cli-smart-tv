import Ember from 'ember';
import layout from '../../templates/components/scroll/horizontal-scroll';

import RowFrame from 'ember-cli-smart-tv/components/frame/row-frame';
import ScrollMixin from 'ember-cli-smart-tv/mixins/scroll/horizontal';

const { computed, on, inject } = Ember;

export default RowFrame.extend(ScrollMixin, {
  layout,

  classNames: ['horizontal-scroll'],

  name: 'scroll-row',

  isPaged: false,
  isAligned: true,

  cellNames: computed(function() {
    const rows = [];

    for (let i = 1; i <= 100; i++) {
       rows.push(`cell-${i}`);
    }

    return rows;
  }),

  // logScrollEvents: on('scroll', function(options) {
  //   console.log('scrollEvent', 'horizontal', options);
  // }),
});
