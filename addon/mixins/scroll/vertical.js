
import Ember from 'ember';

const { on, $ } = Ember;

export default Ember.Mixin.create({
  classNames: ['scroll-window'],

  scrollListener: on('rowDidChange', function(options) {
    this[
      options.direction === 'up' ? 'triggerScrollUp' : 'triggerScrollDown'
    ]();
  }),

  triggerScrollUp() {
    const activeElement = this.get('activeRow.element');
    const offsetTop = $(activeElement).offset().top - $(this.element).offset().top;
    const scrollHeight = $(activeElement)[0].scrollHeight ;

    const scrollTop = $(this.element).scrollTop();
    const windowHeight = $(this.element).height();

    if (offsetTop <= 0) {
      $(this.element).scrollTop(scrollTop - windowHeight);
    }
  },

  triggerScrollDown() {
    const activeElement = this.get('activeRow.element');
    const offsetTop = $(activeElement).offset().top - $(this.element).offset().top;
    const scrollHeight = $(activeElement)[0].scrollHeight ;

    const scrollTop = $(this.element).scrollTop();
    const windowHeight = $(this.element).height();

    if (offsetTop >= windowHeight) {
      $(this.element).scrollTop(scrollTop + offsetTop);
    }
  },
});
