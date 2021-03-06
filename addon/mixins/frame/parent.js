
import Ember from 'ember';

const { computed } = Ember;

export default Ember.Mixin.create({

  /**
   * Is root window property.
   *
   * @property
   * @public
   * @type  { Boolean }
   */
  isRoot: Ember.computed.not('parentWindow'),

  getParentWindow(view) {
    if (!view) {
      return null;
    }

    if (view.get('isWindowFrame')) {
      return view;
    }

    if (view.get('parentView')) {
      return this.getParentWindow(view.get('parentView'));
    }

    return null;
  },

  getParentRow(view) {
    if (!view) {
      return null;
    }

    if (view.get('isRowFrame')) {
      return view;
    }

    if (view.get('parentView')) {
      return this.getParentRow(view.get('parentView'));
    }

    return null;
  },

  getParentCell(view) {
    if (!view) {
      return null;
    }

    if (view.get('isCellFrame')) {
      return view;
    }

    if (view.get('parentView')) {
      return this.getParentCell(view.get('parentView'));
    }

    return null;
  },

  /**
   * Reference to parent window
   *
   * @property
   * @public
   * @type  { Ember.View }
   */
  parentWindow: computed(function() {
    return this.getParentWindow(this.get('parentView'));
  }),

  /**
   * Reference to parent row
   *
   * @property
   * @public
   * @type  { Ember.View }
   */
  parentRow: computed(function() {
    return this.getParentRow(this.get('parentView'));
  }),

  /**
   * Reference to parent cell
   *
   * @property
   * @public
   * @type  { Ember.View }
   */
  parentCell: computed(function() {
    return this.getParentCell(this.get('parentView'));
  }),

  /**
   * Return parent object, if have any parent. Return null, otherwise
   *
   * @property
   * @public
   * @type  { Ember.View }
   */
  anyParent: computed(function() {
    const parentCell = this.get('parentCell');
    const parentRow = this.get('parentRow');
    const parentWindow = this.get('parentWindow');

    if (parentCell) {
      return parentCell;
    }

    if (parentRow) {
      return parentRow;
    }

    if (parentWindow) {
      return parentWindow;
    }

    return null;
  }),

  /**
   * in hover parent
   *
   * @property
   * @public
   * @type  { Boolean }
   */
  isActive: computed('isRoot', 'hasChildWindows', 'childWindows', function() {
    const isRoot = this.get('isRoot');
    const childWindows = this.get('childWindows');
    const hasChildWindows = this.get('hasChildWindows');

    if (hasChildWindows) {
      const anyActiveChild = childWindows.some((childWindow) => {
        return childWindow.get('isActive');
      });

      if (anyActiveChild) {
        return false;
      }
    }

    if (isRoot) {
      return true;
    }

    return false;
  }),
});
