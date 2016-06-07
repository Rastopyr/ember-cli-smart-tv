
import Ember from 'ember';

import ParentMixin from '../../mixins/frame/parent';
import RemoteKeydownMixin from '../../mixins/remote/remote-keydown';
import KeyCodes from '../../services/env/keycodes';
import layout from '../../templates/components/frame/window-frame';

export default Ember.Component.extend(ParentMixin, RemoteKeydownMixin, {

  classNames:['window-frame'],

  classNameBindings: ['isActive:active-window-frame'],

  actions: {
    registerRow(row) {
      this.registerRow(row);
    },

    destroyRow(row) {
      this.destroyRow(row);
    },
  },

  bindKeys: [
    {
      code: KeyCodes.KEY_UP,
      predicates: ['isActiveFrame'],
      handlers: ['changeRowUp'],
    },
    {
      code: KeyCodes.KEY_DOWN,
      predicates: ['isActiveFrame'],
      handlers: ['changeRowDown'],
    },
  ],

  /**
   * Change row index to up
   *
   * @public
   * @function
   */
  changeRowUp() {
    const rows = this.get('rows');
    const activeIndex = this.get('activeIndex');
    const lastIndex = rows.length - 1;
    const isLoop = this.get('isLoop');

    if (activeIndex === 0) {

      if (isLoop) {
        this.set('activeIndex', lastIndex);
        this.trigger('rowDidChange', { direction: 'up' });
      }

      return;
    }

    this.decrementProperty('activeIndex');
    this.trigger('rowDidChange', { direction: 'up' });
    return;
  },

  /**
   * Change active row index to bottom
   *
   * @public
   * @function
   */
  changeRowDown() {
    const rows = this.get('rows');
    const activeIndex = this.get('activeIndex');
    const lastIndex = rows.length - 1;
    const isLoop = this.get('isLoop');

    if (activeIndex === lastIndex) {
      if (isLoop) {
        this.set('activeIndex', 0);
        this.trigger('rowDidChange', { direction: 'down' });
      }

      return;
    }

    this.incrementProperty('activeIndex');
    this.trigger('rowDidChange', { direction: 'down' });
    return;
  },

  /**
   * Predicate for trigger changes
   *
   * @return  { Boolean }
   */
  isActiveFrame() {
    return this.get('isActive');
  },

  /**
   * Index of hovered row
   *
   * @property
   * @public
   * @type  { Number }
   */
  hoverIndex: 0,

  /**
   * Layout string of component
   * @private
   */
  layout: layout,

  /**
   * Flag of view, for window frame
   *
   * @property
   * @public
   * @type  { Boolean }
   */
  isWindowFrame: true,

  frameService: Ember.inject.service('frame'),

  /**
   * Is hovered this window
   *
   * @property
   * @public
   * @type  { Boolean }
   */
  isActive: Ember.computed('frameService.activeWindow', function() {
    const activeWindow = this.get('frameService.activeWindow');

    if (activeWindow === this) {
      return true;
    }

    return this._super();
  }),

  /**
   * Reference to hover row
   *
   * @property
   * @public
   * @type  { Ember.View }
   */
  activeRow: Ember.computed('activeIndex', 'rows.[]', function() {
    const rows = this.get('rows');
    const activeIndex = this.get('activeIndex');

    if (!rows[activeIndex]) {
      Ember.Logger.warn('`Hover index of active window, out of sync with rows`');
    }

    return rows[activeIndex];
  }),

  /**
   * List of child rows
   *
   * @property
   * @public
   * @type  { Array }
   */
  rows: Ember.computed(function() {
    return Ember.A();
  }),

  /**
   * Register new row
   *
   * @function
   * @param { Ember.View }  row Row that should registered
   */
  registerRow(row) {
    row.on('didDestroyElement', this, this.destroyRow);

    this.get('rows').pushObject(row);
  },

  /**
   * Remove row
   *
   * @function
   * @param { Ember.View }  row Row that should removed
   */
  destroyRow(row) {
    const rows = this.get('rows');
    const rowIndex = rows.indexOf(row);

    if (rowIndex === -1) {
      return;
    }

    this.set('rows',
      rows.slice(0, rowIndex).concat(
        rows.slice(rowIndex + 1, rows.length)
      )
    );
  },

  regiserWindow: Ember.on('init', function() {
    const service = this.get('frameService');

    service.trigger('registerWindow', this);
  }),
});
