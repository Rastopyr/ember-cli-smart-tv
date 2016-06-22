
import Ember from 'ember';

const { on, $ } = Ember;

export default Ember.Mixin.create({
  classNames: ['scroll-window'],

  isPaged: true,

  scrollListener: on('rowDidChange', function(options) {
    this[
      options.direction === 'up' ? 'triggerScrollUp' : 'triggerScrollDown'
    ]();
  }),

  triggerScrollUp() {
    const isPaged = this.get('isPaged');
    const activeElement = this.get('activeRow.element');
    const offsetTop = $(activeElement).offset().top - $(this.element).offset().top;
    const scrollHeight = $(activeElement)[0].scrollHeight ;

    const scrollTop = $(this.element).scrollTop();
    const windowHeight = $(this.element).height();

    if (isPaged) {
      if (offsetTop <= 0) {
        $(this.element).scrollTop(scrollTop - windowHeight);
      }

      return;
    }

    $(this.element).scrollTop(scrollTop - scrollHeight);
  },

  triggerScrollDown() {
    const isPaged = this.get('isPaged');
    const activeElement = this.get('activeRow.element');
    const offsetTop = $(activeElement).offset().top - $(this.element).offset().top;
    const scrollHeight = $(activeElement)[0].scrollHeight ;

    const scrollTop = $(this.element).scrollTop();
    const windowHeight = $(this.element).height();

    if (isPaged) {
      if (offsetTop >= windowHeight) {
        $(this.element).scrollTop(scrollTop + offsetTop);
      }

      return;
    }

    $(this.element).scrollTop(scrollTop + scrollHeight);
  },
});
