
import Ember from 'ember';

const { computed, A, on } = Ember;

function verticalChangeWindow(w, direction) {
  const parentWindow = w.get('parentWindow');

  if (!parentWindow) {
    return;
  }

  const parentRow = w.get('parentRow');
  const cellIndex = parentRow.get('cells').indexOf(w.get('parentCell'));

  this.deactivateWindows();

  parentWindow[direction === 'up' ? 'changeRowUp' : 'changeRowDown']();

  parentWindow.set('activeRow.hoverIndex', cellIndex);

  const childWindow = parentWindow.get('activeRow.hoverCell.childWindow');

  if (!childWindow) {
    parentWindow.set('isHover', true);

    return;
  }


  childWindow.set('isHover', true);
}

function horizontalChangeWindow(r, direction) {
  const parentWindow = r.get('parentWindow');
  const parentRow = r.get('parentRow');

  if (!parentWindow) {
    return;
  }

  parentWindow.set('hoverIndex', parentWindow.get('rows').indexOf(parentRow));
  parentRow.set('hoverIndex', parentRow.get('cells').indexOf(r.get('parentCell')));

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

  activeRow: computed('activeWindow', 'activeWindow.activeRow', function () {
    return this.get('activeWindow.activeRow');
  }),

  activeCell: computed('activeRow', 'activeRow.hoverCell', function () {
    return this.get('activeRow.hoverCell');
  }),

  bindUpWindow: on('windowFocusUp', function(w) {
    verticalChangeWindow.apply(this, [w, 'up']);
  }),

  bindDownWindow: on('windowFocusDown', function(w) {
    verticalChangeWindow.apply(this, [w, 'down']);
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

  activateWindowByName(name) {
    this.deactivateWindows();

    const activatedWindow = this.get('windows').find(
      (w)=> w.get('name') === name
    );

    if (activatedWindow && !activatedWindow.get('isHover')) {
      activatedWindow.set('isHover', true);
    }
  },

  activateWindow(wind) {
    this.deactivateWindows(wind);

    if (!wind.get('isHover')) {
      wind.set('isHover', true);
    }
  },

  deactivateWindows(wind) {
    this.get('windows').forEach((wi) => wi.set('isHover', false));
  }
});
