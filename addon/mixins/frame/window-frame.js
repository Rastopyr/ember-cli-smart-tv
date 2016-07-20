
import Ember from 'ember';

import ParentMixin from 'ember-cli-smart-tv/mixins/frame/parent';
import RemoteKeydownMixin from 'ember-cli-smart-tv/mixins/remote/remote-keydown';
import KeyCodes from 'ember-cli-smart-tv/services/env/keycodes';
import layout from 'ember-cli-smart-tv/templates/components/frame/window-frame';

const { computed, on, inject, A, observer } = Ember;

export default Ember.Mixin.create(ParentMixin, RemoteKeydownMixin, {

  classNames:['window-frame'],

  concatenatedProperties: ['bindKeys'],

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

  isHover: false,

  autoActivate: false,

  frameService: inject.service('frame'),

  /**
   * List of child rows
   *
   * @property
   * @public
   * @type  { Array }
   */
  rows: computed(() => A()),

  actions: {
    registerRow(row) {
      this.registerRow(row);
    },

    destroyRow(row) {
      this.destroyRow(row);
    },
  },

  /**
   * Reference to hover row
   *
   * @property
   * @public
   * @type  { Ember.View }
   */
  activeRow: computed('hoverIndex', 'rows.[]', function() {
    const rows = this.get('rows');
    const hoverIndex = this.get('hoverIndex');

    if (!rows[hoverIndex]) {
      Ember.Logger.warn('`Hover index of active window, out of sync with rows`');
    }

    return rows[hoverIndex];
  }),

  registerWindow: on('init', function() {
    const service = this.get('frameService');
    const parentCell = this.get('parentCell');

    if (parentCell) {
      parentCell.registerChildWindow(this);
    }

    this.trigger('didRegisterWindow');
    service.trigger('didRegisterWindow', this);
  }),

  autoActivateTrigger: observer('autoActivate', function() {
    const autoActivate = this.get('autoActivate');

    if (autoActivate) {
      this.get('frameService').activateWindow(this);
    }
  }).on('init'),

  /**
   * Register new row
   *
   * @function
   * @param { Ember.View }  row Row that should registered
   */
  registerRow(row) {
    row.on('didDestroyElement', this, () => this.destroyRow(row));

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
    const noSwitch = this.get('noSwitchUp');

    if (hoverIndex === 0) {

      if (isLoop) {
        this.set('hoverIndex', lastIndex);
        this.trigger('rowDidChange', { direction: 'up' });
      } else {
        this.trigger('focusOnFirstRow');

        if (!noSwitch) {
          this.get('frameService').trigger('windowFocusUp', this);
        }
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
    const noSwitch = this.get('noSwitchDown');

    if (hoverIndex === lastIndex) {
      if (isLoop) {
        this.set('hoverIndex', 0);
        this.trigger('rowDidChange', { direction: 'down' });
      } else {
        this.trigger('focusOnLastRow');

        if (!noSwitch) {
          this.get('frameService').trigger('windowFocusDown', this);
        }
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
});
