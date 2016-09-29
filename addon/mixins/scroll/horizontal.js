
import Ember from 'ember';

const { on, $, Mixin, Evented } = Ember;

export default Mixin.create(Evented, {
  classNames: ['scroll-row'],

  isPaged: true,
  isAligned: true,
  scrollCorrection: 0,

  scrollListener: on('cellDidChange', function(options) {
    this[
      options.direction === 'right' ? 'triggerScrollRight' : 'triggerScrollLeft'
    ]();
  }),

  shouldScroll(direction, element) {
    const activeElement = element || this.get('hoverCell.element');

    const offsetLeft = $(activeElement).offset().left - $(this.element).offset().left;
    const scrollWidth = $(activeElement)[0].scrollWidth;

    const windowWidth = $(this.element).width();

    if (direction === 'right') {
      if (offsetLeft + scrollWidth > windowWidth) {
        return true;
      }
    } else if (offsetLeft <= 0) {
      return true;
    }

    return false;
  },

  triggerScrollRight() {
    const isAligned = this.get('isAligned');
    const isPaged = this.get('isPaged');
    const scrollCorrection = this.get('scrollCorrection');
    const activeElement = this.get('hoverCell.element');

    const offsetLeft = $(activeElement).offset().left - $(this.element).offset().left;
    const scrollWidth = $(activeElement)[0].scrollWidth;

    const scrollLeft = $(this.element).scrollLeft();
    const windowWidth = $(this.element).width();

    if (offsetLeft + scrollWidth > windowWidth) {
      if (isAligned) {
        if (isPaged) {
          this.trigger('scroll', {
            type: 'paged_aligned',
            direction: 'right',
          });

          $(this.element).scrollLeft(scrollLeft + offsetLeft + scrollCorrection);
        } else {
          this.trigger('scroll', {
            type: 'aligned',
            direction: 'right',
          });

          $(this.element).scrollLeft(
            scrollLeft + $(activeElement).outerWidth(true) + scrollCorrection
          );
        }
      } else if (isPaged) {
        this.trigger('scroll', {
          type: 'paged',
          direction: 'right',
        });

        $(this.element).scrollLeft(scrollLeft + offsetLeft + scrollCorrection);
      } else {
        this.trigger('scroll', {
          type: 'default',
          direction: 'right',
        });

        $(this.element).scrollLeft(scrollLeft + scrollWidth + scrollCorrection);
      }
    }
  },

  triggerScrollLeft() {
    const isPaged = this.get('isPaged');
    const isAligned = this.get('isAligned');
    const scrollCorrection = this.get('scrollCorrection');
    const activeElement = this.get('hoverCell.element');

    const offsetLeft = $(activeElement).offset().left - $(this.element).offset().left;
    const scrollWidth = $(activeElement)[0].scrollWidth;

    const scrollLeft = $(this.element).scrollLeft();
    const windowWidth = $(this.element).width();

    if (offsetLeft <= 0) {
      if (isAligned) {
        if (isPaged) {
          this.trigger('scroll', {
            type: 'paged_aligned',
            direction: 'left',
          });

          $(this.element).scrollLeft(
            scrollLeft - windowWidth + $(activeElement).outerWidth(true) - scrollCorrection
          );
        } else {
          this.trigger('scroll', {
            type: 'aligned',
            direction: 'left',
          });

          $(this.element).scrollLeft(
            scrollLeft - (scrollWidth - $(activeElement).offset().left) - scrollCorrection
          );
        }
      } else if (isPaged) {
        this.trigger('scroll', {
          type: 'paged',
          direction: 'left',
        });

        $(this.element).scrollLeft(scrollLeft - windowWidth - scrollCorrection);
      } else {
        this.trigger('scroll', {
          type: 'default',
          direction: 'left',
        });

        $(this.element).scrollLeft(scrollLeft - scrollWidth - scrollCorrection);
      }
    }
  },
});
