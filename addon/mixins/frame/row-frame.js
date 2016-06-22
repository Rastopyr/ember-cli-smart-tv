
import Ember from 'ember';

import ParentMixin from '../../mixins/frame/parent';
import KeyCodes from '../../services/env/keycodes';
import RemoteKeydownMixin from '../../mixins/remote/remote-keydown';
import layout from '../../templates/components/frame/row-frame';

export default Ember.Mixin.create(ParentMixin, RemoteKeydownMixin, {

  classNames: ['frame-row-frame'],

  concatenatedProperties: ['bindKeys'],

  bindKeys: [
    {
      code: KeyCodes.KEY_RIGHT,
      predicates: ['isInHover'],
      handlers: ['changeCellRight'],
    },
    {
      code: KeyCodes.KEY_LEFT,
      predicates: ['isInHover'],
      handlers: ['changeCellLeft'],
    },
  ],

  actions: {
    registerCell(cell) {
      this.registerCell(cell);
    },

    destroyCell(cell) {
      this.destroyCell(cell);
    },
  },

  /**
   * Layout string of component
   *
   * @private
   */
  layout: layout,

  /**
   * Name of action for register row
   *
   * @private
   * @property
   * @type  { String }
   */
  registerRow: 'registerRow',

  /**
   * Loop of cells of row
   *
   * @public
   * @property
   * @type  { Boolean }
   */
  isLoop: false,

  /**
   * Flag of view, for row frame
   *
   * @property
   * @public
   * @type  { Boolean }
   */
  isRowFrame: true,

  frameService: Ember.inject.service('frame'),

  /**
   * Index of hovered cell
   *
   * @property
   * @public
   * @type  { Number }
   */
  hoverIndex: 0,

  /**
   * Index of current row, by parentView
   *
   * @property
   * @public
   * @type  { Boolean }
   */
  rowIndex: Ember.computed('parentWindow.rows.[]', function() {
    return this.get('parentWindow.rows').indexOf(this);
  }),

  /**
   * Is hovered this row
   *
   * @property
   * @public
   * @type  { Boolean }
   */
  isHover: Ember.computed('parentWindow.hoverIndex', 'parentWindow.isHover', 'rowIndex', function() {
    const parentView = this.get('parentWindow');

    if (!parentView || !parentView.get('isHover')) {
      return false;
    }

    return parentView.get('hoverIndex') === this.get('rowIndex');
  }),

  /**
   * List of child cells
   *
   * @property
   * @public
   * @type  { Array }
   */
  cells: Ember.computed(function() {
    return Ember.A();
  }),

  /**
   * Register row in parent window
   */
  registerRowInParent: Ember.on('init', function() {
    const parentWindow = this.get('parentWindow');

    if (!parentWindow) {
      Ember.Logger.warn('Parent window not detected');
      return;
    }

    parentWindow.registerRow(this);
  }),

  /**
   * Reference to hovered Cell
   *
   * @property
   * @public
   * @type  { Ember.View }
   */
  hoverCell: Ember.computed('hoverIndex', 'cells', function() {
    const cells = this.get('cells');
    const hoverIndex = this.get('hoverIndex');

    if (!cells[hoverIndex]) {
      Ember.Logger.warn('`Hover index of active row, out of sync with cells`');
    }

    return cells[hoverIndex];
  }),

  /**
   * Predicate function, for key binings
   *
   * @function
   * @return  { Boolean }
   */
  isInHover() {
    return this.get('isHover');
  },

  /**
   * Change cell index to left
   *
   * @public
   * @function
   */
  changeCellLeft() {
    const cells = this.get('cells');
    const hoverIndex = this.get('hoverIndex');
    const lastIndex = cells.length > 0 ? cells.length - 1 : 0;
    const isLoop = this.get('isLoop');
    const noSwitch = this.get('noSwitch');

    if (hoverIndex === 0) {

      if (isLoop) {
        this.set('hoverIndex', lastIndex);
        this.trigger('cellDidChange', { direction: 'left' });
      }

      if (!noSwitch) {
        this.get('frameService').trigger(
          'rowFocusLeft',
          this.get('parentWindow')
        );
      }

      return;
    }

    this.decrementProperty('hoverIndex');
    this.trigger('cellDidChange', { direction: 'left' });

    return;
  },

  /**
   * Change cell index to right
   *
   * @public
   * @function
   */
  changeCellRight() {
    const cells = this.get('cells');
    const hoverIndex = this.get('hoverIndex');
    const lastIndex = cells.length > 0 ? cells.length - 1 : 0;
    const isLoop = this.get('isLoop');
    const noSwitch = this.get('noSwitch');

    if (hoverIndex === lastIndex) {
      if (isLoop) {
        this.set('hoverIndex', 0);
        this.trigger('cellDidChange', { direction: 'right' });
      }

      if (!noSwitch) {
        this.get('frameService').trigger(
          'rowFocusRight',
          this.get('parentWindow')
        );
      }

      return;
    }

    this.incrementProperty('hoverIndex');
    this.trigger('cellDidChange', { direction: 'right' });

    return;
  },

  /**
   * Register new cell
   *
   * @function
   * @param { Ember.View }  cell Cell that should registered
   */
  registerCell(cell) {
    cell.on('didDestroyElement', this, () => this.destroyCell(cell));

    this.get('cells').pushObject(cell);
  },

  /**
   * Remove cell
   *
   * @function
   * @param { Ember.View }  cell Cell that should removed
   */
   destroyCell(cell) {
     this.get('cells').removeObject(cell);
   },
});
