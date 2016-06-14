
import Ember from 'ember';

import ParentMixin from 'ember-cli-smart-tv/mixins/frame/parent';
import RemoteKeydownMixin from 'ember-cli-smart-tv/mixins/remote/remote-keydown';
import KeyCodes from 'ember-cli-smart-tv/services/env/keycodes';
import layout from 'ember-cli-smart-tv/templates/components/frame/window-frame';

const { computed, on } = Ember;

export default Ember.Mixin.create(ParentMixin, RemoteKeydownMixin, {

  classNames:['window-frame'],

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
      predicates: ['isHoverFrame'],
      handlers: ['changeRowUp'],
    },
    {
      code: KeyCodes.KEY_DOWN,
      predicates: ['isHoverFrame'],
      handlers: ['changeRowDown'],
    },
  ],

  registerChildWindow: 'registerChildWindow',

  /**
   * Change row index to up
   *
   * @public
   * @function
   */
  changeRowUp() {
    const rows = this.get('rows');
    const hoverIndex = this.get('hoverIndex');
    const lastIndex = rows.length - 1;
    const isLoop = this.get('isLoop');
    const noSwitch = this.get('noSwitch');

    if (hoverIndex === 0) {

      if (isLoop) {
        this.set('hoverIndex', lastIndex);
        this.trigger('rowDidChange', { direction: 'up' });
      }

      if (!noSwitch) {
        this.get('frameService').trigger('windowFocusUp', this);
      }

      return;
    }

    this.decrementProperty('hoverIndex');
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
    const hoverIndex = this.get('hoverIndex');
    const lastIndex = rows.length - 1;
    const isLoop = this.get('isLoop');
    const noSwitch = this.get('noSwitch');

    if (hoverIndex === lastIndex) {
      if (isLoop) {
        this.set('hoverIndex', 0);
        this.trigger('rowDidChange', { direction: 'down' });
      }

      if (!noSwitch) {
        this.get('frameService').trigger('windowFocusDown', this);
      }

      return;
    }

    this.incrementProperty('hoverIndex');
    this.trigger('rowDidChange', { direction: 'down' });
    return;
  },

  /**
   * Predicate for trigger changes
   *
   * @return  { Boolean }
   */
  isHoverFrame() {
    return this.get('isHover');
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

  isHover: false,

  /**
   * Reference to hover row
   *
   * @property
   * @public
   * @type  { Ember.View }
   */
  activeRow: Ember.computed('hoverIndex', 'rows.[]', function() {
    const rows = this.get('rows');
    const hoverIndex = this.get('hoverIndex');

    if (!rows[hoverIndex]) {
      Ember.Logger.warn('`Hover index of active window, out of sync with rows`');
    }

    return rows[hoverIndex];
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
    this.get('rows').removeObject(row);
  },

  activateWindow() {
    this.get('frameService.windows').forEach((wi)=> wi.set('isHover', false));

    this.set('isHover', true);
  },

  registerWindow: Ember.on('init', function() {
    const service = this.get('frameService');
    const parentCell = this.get('parentCell');

    if (parentCell) {
      parentCell.registerChildWindow(this);
    }

    service.trigger('registerWindow', this);
  })
});
