
import Ember from 'ember';

import ParentMixin from '../../mixins/frame/parent';

import layout from '../../templates/components/frame/cell-frame';

const { computed, observer } = Ember;

export default Ember.Component.extend(ParentMixin, {

  tagName: 'span',

  classNames: ['frame-cell-frame'],

  classNameBindings: ['isHover:hover-cell-frame'],

  /**
   * Layout string of component
   * @private
   */

  layout: layout,

  /**
   * Flag of view, for cell frame
   *
   * @property
   * @public
   * @type  { Boolean }
   */
   isCellFrame: true,

   /**
    * Index of current cell, by parentView
    *
    * @property
    * @public
    * @type  { Boolean }
    */
   cellIndex: Ember.computed('parentRow.cells.[]', function() {
     return this.get('parentRow.cells').indexOf(this);
   }),

   /**
    * Register this cell in parent row
    */
   registerCellInParent: Ember.on('didInsertElement', function() {
    const parentRow = this.get('parentRow');

    if (!parentRow) {
      Ember.Logger.warn('Parent row not detected');
      return;
    }

    parentRow.registerCell(this);
   }),

   /**
    * Is hovered this cell
    *
    * @property
    * @public
    * @type  { Boolean }
    */
   isHover: Ember.computed('cellIndex', 'parentRow.isHover', 'parentRow.hoverIndex', function() {
     const parentRow = this.get('parentRow');

     if (!parentRow || !parentRow.get('isHover')) {
       return false;
     }

     return parentRow.get('hoverIndex') === this.get('cellIndex');
   }),

  activateChildWindow: observer('isHover', function() {
    const isHover = this.get('isHover');
    const childWindow = this.get('childWindow');

    if (isHover && childWindow) {
      childWindow.activateWindow();
    }
  }),

  childWindow: computed('childWindows.[]', function() {
    const childWindows = this.get('childWindows');

    if (childWindows.length > 1) {
      throw new Error('Child window for cell should be one');
    }

    return childWindows[0];
  }),

  isHasChildWindow: computed.bool('childWindow'),
});
