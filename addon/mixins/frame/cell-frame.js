
import Ember from 'ember';

import ParentMixin from '../../mixins/frame/parent';

import layout from '../../templates/components/frame/cell-frame';

const { computed, observer, inject, on } = Ember;

export default Ember.Mixin.create(ParentMixin, {

  tagName: 'span',

  classNames: ['frame-cell-frame'],

  concatenatedProperties: ['bindKeys'],

  isHasChildWindow: computed.bool('childWindow'),

  frameService: inject.service('frame'),

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
   cellIndex: computed('parentRow.cells.[]', function() {
     return this.get('parentRow.cells').indexOf(this);
   }),

   /**
    * Register this cell in parent row
    */
   registerCellInParent: on('init', function() {
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
   isHover: computed('cellIndex', 'parentRow.isHover', 'parentRow.hoverIndex', function() {
     const parentRow = this.get('parentRow');
     const activeRow = this.get('frameService.activeRow');

     if (!parentRow || !parentRow.get('isHover')) {
       return false;
     }

     return parentRow.get('hoverIndex') === this.get('cellIndex');
   }),

  activateChildWindow: observer('isHover', function() {
    const isHover = this.get('isHover');
    const childWindow = this.get('childWindow');

    if (isHover && childWindow) {
      this.get('frameService').activateWindow(childWindow);
    }
  }),

  registerChildWindow(w) {
    this.set('childWindow', w);
  },
});
