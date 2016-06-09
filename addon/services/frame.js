
import Ember from 'ember';

const { computed, A, on } = Ember;

export default Ember.Service.extend(Ember.Evented, {

  windows: computed(()=> A()),

  activeWindow: computed('windows.[]', 'windows.@each.focused', function() {
    const windows = this.get('windows');
    // const forceActiveWindow = windows.find((w) => w.get('forceActive'));
    const forceActiveWindow = windows.find((w) => w.get('focused'));
    const probWindow = forceActiveWindow ? forceActiveWindow : windows.get('lastObject');

    if (probWindow.get('focused') === undefined) {
      probWindow.set('focused', true);
    }

    return probWindow;
  }),

  bindUpWindow: on('windowFocusUp', function(w) {
    const parentWindow = w.get('parentWindow');

    if (!parentWindow) {
      return;
    }

    this.get('windows').forEach((wi)=> wi.set('focused', false));

    parentWindow.changeRowUp();
    parentWindow.set('focused', true);
  }),

  bindDownWindow: on('windowFocusDown', function(w) {
    const parentWindow = w.get('parentWindow');

    if (!parentWindow) {
      return;
    }

    this.get('windows').forEach((wi)=> wi.set('focused', false));

    parentWindow.changeRowDown();
    parentWindow.set('focused', true);
  }),

  bindRightRow: on('rowFocusRight', function(r) {
    const parentWindow = r.get('parentWindow.parentWindow');
    if (!parentWindow) {
      return;
    }
    const childWindow = parentWindow.get('activeRow.hoverCell.childWindow');

    if (!childWindow) {
      return;
    }

    this.get('windows').forEach((wi)=> wi.set('focused', false));

    parentWindow.get('activeRow').changeCellRight();
    parentWindow.set('focused', true);
  }),

  bindLeftRow: on('rowFocusLeft', function(r) {
    const parentWindow = r.get('parentWindow.parentWindow');
    if (!parentWindow) {
      return;
    }
    const childWindow = parentWindow.get('activeRow.hoverCell.childWindow');

    if (!childWindow) {
      return;
    }

    this.get('windows').forEach((wi)=> wi.set('focused', false));

    parentWindow.get('activeRow').changeCellLeft();
    parentWindow.set('focused', true);
  }),

  activeRow: computed.alias('activeWindow.activeRow'),

  activeCell: computed.alias('activeRow.activeCell'),

  regitserWindow: on('registerWindow', function(wind) {
    this.get('windows').pushObject(wind);
  }),
});
