
import Ember from 'ember';

const { on, $, Evented, Mixin } = Ember;

export default Mixin.create(Evented, {
  classNames: ['scroll-window'],

  isPaged: true,

  scrollListener: on('rowDidChange', function(options) {
    this[
      options.direction === 'up' ? 'triggerScrollUp' : 'triggerScrollDown'
    ]();
  }),

  shouldScroll(direction, element) {
    const activeElement = element || this.get('activeRow.element');
    const offsetTop = $(activeElement).offset().top - $(this.element).offset().top;
    const scrollHeight = $(activeElement)[0].scrollHeight ;

    const windowHeight = $(this.element).height();

    if (direction === 'up') {
      if (offsetTop <= 0) {
        return true;
      }
    } else if (direction === 'down') {
      if (offsetTop + scrollHeight >= windowHeight) {
        return true;
      }
    }

    return false;
  },

  triggerScrollUp() {
    const isPaged = this.get('isPaged');
    const activeElement = this.get('activeRow.element');
    const offsetTop = $(activeElement).offset().top - $(this.element).offset().top;
    const scrollHeight = $(activeElement)[0].scrollHeight ;

    const scrollTop = $(this.element).scrollTop();
    const windowHeight = $(this.element).height();

    if (offsetTop <= 0) {
      if (isPaged) {
        this.trigger('scroll', {
          type: 'paged',
          direction: 'up',
        });

        $(this.element).scrollTop(scrollTop - windowHeight);
      } else {
        this.trigger('scroll', {
          type: 'default',
          direction: 'up',
        });

        $(this.element).scrollTop(scrollTop - scrollHeight);
      }
    }
  },

  triggerScrollDown() {
    const isPaged = this.get('isPaged');
    const activeElement = this.get('activeRow.element');
    const offsetTop = $(activeElement).offset().top - $(this.element).offset().top;
    const scrollHeight = $(activeElement)[0].scrollHeight ;

    const scrollTop = $(this.element).scrollTop();
    const windowHeight = $(this.element).height();

    if (offsetTop + scrollHeight >= windowHeight) {
      if (isPaged) {
        this.trigger('scroll', {
          type: 'paged',
          direction: 'down',
        });

        $(this.element).scrollTop(scrollTop + offsetTop);
      } else {
        this.trigger('scroll', {
          type: 'default',
          direction: 'down',
        });

        $(this.element).scrollTop(scrollTop + scrollHeight);
      }
    }
  },
});
