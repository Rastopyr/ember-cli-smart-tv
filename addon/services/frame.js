
import Ember from 'ember';

const { computed, A, on, observer } = Ember;

function verticalChangeWindow(w, direction) {
  const parentWindow = w.get('parentWindow');

  if (!parentWindow) {
    return;
  }

  this.deactivateWindows();

  parentWindow[direction === 'up' ? 'changeRowUp' : 'changeRowDown']();

  const childWindow = parentWindow.get('activeRow.hoverCell.childWindow');

  if (!childWindow) {
    parentWindow.set('isHover', true);
    return;
  }

  childWindow.set('isHover', true);
}

function horizontalChangeWindow(r, direction) {
  const parentWindow = r.get('parentWindow');

  if (!parentWindow) {
    return;
  }

  this.deactivateWindows();

  parentWindow.get('activeRow')[
    direction === 'right' ? 'changeCellRight' : 'changeCellLeft'
  ]();

  const childWindow = parentWindow.get('activeRow.hoverCell.childWindow');

  if (!childWindow) {
    parentWindow.set('isHover', true);
    return;
  }

  childWindow.set('isHover', true);
}

export default Ember.Service.extend(Ember.Evented, {

  windows: computed(()=> A()),

  activeWindow: computed('windows.[]', 'windows.@each.isHover', function() {
    return this.get('windows').find((w) => w.get('isHover'));
  }),

  activeRow: computed.alias('activeWindow.activeRow'),

  activeCell: computed.alias('activeRow.activeCell'),

  bindUpWindow: on('windowFocusUp', function(w) {
    verticalChangeWindow.apply(this, [w, 'up'])
  }),

  bindDownWindow: on('windowFocusDown', function(w) {
    verticalChangeWindow.apply(this, [w, 'down'])
  }),

  bindRightRow: on('rowFocusRight', function(r) {
    horizontalChangeWindow.apply(this, [r, 'right']);
  }),

  bindLeftRow: on('rowFocusLeft', function(r) {
    horizontalChangeWindow.apply(this, [r, 'left']);
  }),

  registerWindow: on('didRegisterWindow', function(wind) {
    wind.on('didDestroyElement', () => this.destroyWindow(wind));

    this.get('windows').pushObject(wind);
  }),

  destroyWindow(wind) {
    this.get('windows').removeObject(wind);
  },

  activateWindow(wind) {
    this.deactivateWindows();

    wind.set('isHover', true);
  },

  activateWindowByName(name) {
    const windows = this.get('windows');

    this.deactivateWindows();

    const activatedWindow = windows.find((w)=> w.get('name') === name)

    if (activatedWindow) {
      activatedWindow.set('isHover', true);
    }
  },

  deactivateWindows() {
    this.get('windows').forEach((wi)=> wi.set('isHover', false));
  }
});
