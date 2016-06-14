
import Ember from 'ember';

const { computed, A, on, observer } = Ember;

export default Ember.Service.extend(Ember.Evented, {

  windows: computed(()=> A()),

  activeWindow: computed('windows.[]', 'windows.@each.isHover', function() {
    return this.get('windows').find((w) => w.get('isHover'));
  }),

  bindUpWindow: on('windowFocusUp', function(w) {
    const parentWindow = w.get('parentWindow');

    if (!parentWindow) {
      return;
    }

    this.get('windows').forEach((wi)=> wi.set('isHover', false));
    parentWindow.changeRowUp();

    const childWindow = parentWindow.get('activeRow.hoverCell.childWindow');

    if (!childWindow) {
      parentWindow.set('isHover', true);
      return;
    }

    childWindow.set('isHover', true);
  }),

  bindDownWindow: on('windowFocusDown', function(w) {
    const parentWindow = w.get('parentWindow');

    if (!parentWindow) {
      return;
    }

    this.get('windows').forEach((wi)=> wi.set('isHover', false));
    parentWindow.changeRowDown();

    const childWindow = parentWindow.get('activeRow.hoverCell.childWindow');

    if (!childWindow) {
      parentWindow.set('isHover', true);
      return;
    }

    childWindow.set('isHover', true);
  }),

  bindRightRow: on('rowFocusRight', function(r) {
    const parentWindow = r.get('parentWindow.parentWindow');

    if (!parentWindow) {
      return;
    }

    this.get('windows').forEach((wi)=> wi.set('isHover', false));

    parentWindow.get('activeRow').changeCellRight();

    const childWindow = parentWindow.get('activeRow.hoverCell.childWindow');

    if (!childWindow) {
      parentWindow.set('isHover', true);
      return;
    }

    childWindow.set('isHover', true);

  }),

  bindLeftRow: on('rowFocusLeft', function(r) {
    const parentWindow = r.get('parentWindow.parentWindow');

    if (!parentWindow) {
      return;
    }

    this.get('windows').forEach((wi)=> wi.set('isHover', false));
    parentWindow.get('activeRow').changeCellLeft();

    const childWindow = parentWindow.get('activeRow.hoverCell.childWindow');

    if (!childWindow) {
      parentWindow.set('isHover', true);
      return;
    }

    childWindow.set('isHover', true);
  }),

  activeRow: computed.alias('activeWindow.activeRow'),

  activeCell: computed.alias('activeRow.activeCell'),

  regitserWindow: on('registerWindow', function(wind) {
    wind.on('didDestroyElement', () => this.destroyWindow(wind));

    this.get('windows').pushObject(wind);
  }),

  destroyWindow(wind) {
    this.get('windows').removeObject(wind);
  }
});
