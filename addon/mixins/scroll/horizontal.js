
import Ember from 'ember';

const { on, $, Mixin } = Ember;

export default Mixin.create({
  classNames: ['scroll-row'],

  isPaged: true,

  scrollListener: on('cellDidChange', function(options) {
    this[
      options.direction === 'right' ? 'triggerScrollRight' : 'triggerScrollLeft'
    ]();
  }),

  triggerScrollRight() {
    const isPaged = this.get('isPaged');
    const activeElement = this.get('hoverCell.element');

    const offsetLeft = $(activeElement).offset().left - $(this.element).offset().left;
    const scrollWidth = $(activeElement)[0].scrollWidth;

    const scrollLeft = $(this.element).scrollLeft();
    const windowWidth = $(this.element).width();

    if (offsetLeft + scrollWidth > windowWidth) {
      if (isPaged) {
        $(this.element).scrollLeft(scrollLeft + offsetLeft);
      } else {
        $(this.element).scrollLeft(scrollLeft + scrollWidth);
      }
    }
  },

  triggerScrollLeft() {
    const isPaged = this.get('isPaged');
    const activeElement = this.get('hoverCell.element');

    const offsetLeft = $(activeElement).offset().left - $(this.element).offset().left;
    const scrollWidth = $(activeElement)[0].scrollWidth;

    const scrollLeft = $(this.element).scrollLeft();
    const windowWidth = $(this.element).width();

    if (offsetLeft <= 0) {
      if (isPaged) {
        $(this.element).scrollLeft(scrollLeft - windowWidth);
      } else {
        $(this.element).scrollLeft(scrollLeft - scrollWidth);
      }
    }
  },
});
