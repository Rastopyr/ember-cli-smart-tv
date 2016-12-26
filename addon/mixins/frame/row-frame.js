
import Ember from 'ember';

import ParentMixin from '../../mixins/frame/parent';
import KeyCodes from '../../services/env/keycodes';
import RemoteKeydownMixin from '../../mixins/remote/remote-keydown';
import layout from '../../templates/components/frame/row-frame';

const {
  Mixin, A, observer, computed, on, run
} = Ember;

export default Mixin.create(ParentMixin, RemoteKeydownMixin, {

  classNames: ['frame-row-frame'],

  concatenatedProperties: ['bindKeys'],

  bindKeys: [
    {
      code: KeyCodes.KEY_RIGHT,
      predicates: ['isInHover'],
      handlers: ['changeCellRight'],
    },
    {
      code: KeyCodes.KEY_ENTER,
      predicates: ['isInHover'],
      handlers: ['enterAction'],
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

  /**
   * Index of hovered cell
   *
   * @property
   * @public
   * @type  { Number }
   */
  hoverIndex: 0,

  frameService: Ember.inject.service('frame'),

  /**
   * Index of current row, by parentView
   *
   * @property
   * @public
   * @type  { Boolean }
   */
  rowIndex: computed('parentWindow.rows.[]', function() {
    return this.get('parentWindow.rows').indexOf(this);
  }),

  /**
   * Is hovered this row
   *
   * @property
   * @public
   * @type  { Boolean }
   */
  isHover: computed('parentWindow.hoverIndex', 'rowIndex', 'frameService.activeWindow', function() {
    const parentView = this.get('parentWindow');
    const activeWindow = this.get('frameService.activeWindow');

    if (!parentView || !parentView.get('isHover') || activeWindow !== parentView) {
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
  cells: computed(function() {
    return A();
  }),

  /**
   * Register row in parent window
   */
  registerRowInParent: on('init', function() {
   run.schedule('render', ()=> {
     const parentWindow = this.get('parentWindow');

     if (!parentWindow) {
       Ember.Logger.warn('Parent window not detected');
       return;
     }

     parentWindow.registerRow(this);
   });
  }),

  /**
   * Reference to hovered Cell
   *
   * @property
   * @public
   * @type  { Ember.View }
   */
  hoverCell: computed('hoverIndex', 'parentWindow.isHover', 'isHover', 'cells.[]', function() {
    const cells = this.get('cells');
    const hoverIndex = this.get('hoverIndex');

    if (cells.length > 0 && !cells[hoverIndex]) {
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
    const noSwitch = this.get('noSwitchLeft');

    if (hoverIndex === 0) {

      if (isLoop) {
        this.set('hoverIndex', lastIndex);
        this.trigger('cellDidChange', { direction: 'left' });
      } else {
        this.trigger('focusOnFirstCell');

        if (!noSwitch) {
          this.get('frameService').trigger(
            'rowFocusLeft',
            this.get('parentWindow')
          );
        }
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
    const noSwitch = this.get('noSwitchRight');
    const inheritPosition = this.get('parentWindow.inheritPosition');

    if (hoverIndex === lastIndex) {
      if (isLoop) {
        this.set('hoverIndex', 0);
        this.trigger('cellDidChange', { direction: 'right' });
      } else {
        this.trigger('focusOnLastCell');

        if (!noSwitch) {
          this.get('frameService').trigger(
            'rowFocusRight',
            this.get('parentWindow')
          );
        }
      }

      return;
    }

    this.incrementProperty('hoverIndex');
    this.trigger('cellDidChange', { direction: 'right' });
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
