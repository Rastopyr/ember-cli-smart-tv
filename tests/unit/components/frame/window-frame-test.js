
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

import * as Codes from 'ember-cli-smart-tv/services/env/keycodes';

moduleForComponent('frame/window-frame', 'Unit | Component | frame/window-frame', {
  unit: true,
  needs: [
    'component:frame/window-frame',
    'component:frame/row-frame',
    'component:frame/cell-frame',
    'service:env/keydown',
    'service:env/tizen/keydown'
  ]
});

test('it should have default values', function(assert) {
  assert.expect(5);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create()
  });

  assert.ok(component.get('rows') instanceof Array);
  assert.equal(component.get('hoverIndex'), 0);
  assert.ok(component.get('isWindowFrame'));
  assert.ok(component.get('isHover'));
  assert.ok(component.get('isRoot'));
});

test('it should register row', function(assert) {
  assert.expect(2);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create()
  });

  const row = this.container.lookup('component:frame/row-frame');

  component.registerRow(row);

  assert.equal(component.get('rows').length, 1);
  assert.ok(!!~component.get('rows').indexOf(row));
});

test('it should remove row', function(assert) {
  assert.expect(4);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create()
  });

  const row = this.container.lookup('component:frame/row-frame');

  component.registerRow(row);

  assert.equal(component.get('rows').length, 1);
  assert.ok(!!~component.get('rows').indexOf(row));

  component.destroyRow(row);

  assert.equal(component.get('rows').length, 0);
  assert.notOk(!!~component.get('rows').indexOf(row));
});

test('it should register row by action', function(assert) {
  assert.expect(2);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create()
  });

  const row = this.container.lookup('component:frame/row-frame');

  component.send('registerRow', row);

  assert.equal(component.get('rows').length, 1);
  assert.ok(!!~component.get('rows').indexOf(row));
});

test('it should destroy row by action', function(assert) {
  assert.expect(4);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create()
  });

  const row = this.container.lookup('component:frame/row-frame');

  component.registerRow(row);

  assert.equal(component.get('rows').length, 1);
  assert.ok(!!~component.get('rows').indexOf(row));

  component.send('destroyRow', row);

  assert.equal(component.get('rows').length, 0);
  assert.notOk(!!~component.get('rows').indexOf(row));
});

test('it should change row index', function(assert) {
  assert.expect(3);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create(),
  });

  const rowA = this.container.lookup('component:frame/row-frame');
  const rowB = this.container.lookup('component:frame/row-frame');

  component.registerRow(rowA);
  component.registerRow(rowB);

  assert.equal(component.get('hoverIndex'), 0);

  component.changeRowDown();

  assert.equal(component.get('hoverIndex'), 1);

  component.changeRowUp();

  assert.equal(component.get('hoverIndex'), 0);
});

test('it should trigger event action after change row down', function(assert) {
  assert.expect(2);

  const service = Ember.Service.extend(Ember.Evented).create();

  const component = this.subject({
    isLoop: true,
    envService: service
  });

  const rowA = this.container.lookup('component:frame/row-frame');
  const rowB = this.container.lookup('component:frame/row-frame');

  component.registerRow(rowA);
  component.registerRow(rowB);

  Ember.run.begin();

  component.one('rowDidChange', function(e) {
    assert.equal(e.direction, 'down');
    assert.deepEqual(component.get('hoverRow'), rowB);

    Ember.run.end();
  });

  component.changeRowDown();
});

test('it should trigger event action after change row up', function(assert) {
  assert.expect(2);

  const service = Ember.Service.extend(Ember.Evented).create();

  const component = this.subject({
    isLoop: true,
    envService: service
  });

  const rowA = this.container.lookup('component:frame/row-frame');
  const rowB = this.container.lookup('component:frame/row-frame');

  component.registerRow(rowA);
  component.registerRow(rowB);

  Ember.run.begin();

  component.one('rowDidChange', function(e) {
    assert.equal(e.direction, 'up');
    assert.deepEqual(component.get('hoverRow'), rowB);

    Ember.run.end();
  });

  component.changeRowUp();
});

test('it should change hover row', function(assert) {
  assert.expect(3);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create(),
  });

  const rowA = this.container.lookup('component:frame/row-frame');
  const rowB = this.container.lookup('component:frame/row-frame');

  component.registerRow(rowA);
  component.registerRow(rowB);

  assert.deepEqual(component.get('hoverRow'), rowA);

  component.changeRowDown();

  assert.deepEqual(component.get('hoverRow'), rowB);

  component.changeRowUp();

  assert.deepEqual(component.get('hoverRow'), rowA);
});

test('it should change hover row to down as loop behavoir', function(assert) {
  assert.expect(3);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create(),
    isLoop: true,
  });

  const rowA = this.container.lookup('component:frame/row-frame');
  const rowB = this.container.lookup('component:frame/row-frame');

  component.registerRow(rowA);
  component.registerRow(rowB);

  assert.deepEqual(component.get('hoverRow'), rowA);

  component.changeRowDown();

  assert.deepEqual(component.get('hoverRow'), rowB);

  component.changeRowDown();

  assert.deepEqual(component.get('hoverRow'), rowA);
});

test('it should change hover row to up as loop behavoir', function(assert) {
  assert.expect(3);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create(),
    isLoop: true,
  });

  const rowA = this.container.lookup('component:frame/row-frame');
  const rowB = this.container.lookup('component:frame/row-frame');

  component.registerRow(rowA);
  component.registerRow(rowB);

  assert.deepEqual(component.get('hoverRow'), rowA);

  component.changeRowUp();

  assert.deepEqual(component.get('hoverRow'), rowB);

  component.changeRowUp();

  assert.deepEqual(component.get('hoverRow'), rowA);
});

test('it should change hover index and row by `keyup` event trigger', function(assert) {
  assert.expect(3);

  const service = Ember.Service.extend(Ember.Evented).create();

  const component = this.subject({
    envService: service
  });

  const rowA = this.container.lookup('component:frame/row-frame');
  const rowB = this.container.lookup('component:frame/row-frame');

  component.registerRow(rowA);
  component.registerRow(rowB);

  assert.equal(component.get('hoverRow'), rowA);

  service.trigger('keydown', { code: Codes.KEY_DOWN });

  return new Ember.RSVP.Promise(function(resolve) {
    component.on('rowDidChange', function(e) {
      assert.equal(e.direction, 'down');
      assert.deepEqual(component.get('hoverRow'), rowB);
      resolve();
    });
  });
});

test('it should change hover index and row by `keydown` event trigger', function(assert) {
  assert.expect(3);

  const service = Ember.Service.extend(Ember.Evented).create();

  const component = this.subject({
    isLoop: true,
    envService: service
  });

  const rowA = this.container.lookup('component:frame/row-frame');
  const rowB = this.container.lookup('component:frame/row-frame');

  component.registerRow(rowA);
  component.registerRow(rowB);

  assert.equal(component.get('hoverRow'), rowA);

  service.trigger('keydown', { code: Codes.KEY_UP });

  return new Ember.RSVP.Promise(function(resolve) {
    component.on('rowDidChange', function(e) {
      assert.equal(e.direction, 'up');
      assert.deepEqual(component.get('hoverRow'), rowB);
      resolve();
    });
  });
});

test('it should hover by default', function(assert) {
  assert.expect(1);

  const service = Ember.Service.extend(Ember.Evented).create();

  const component = this.subject({
    isLoop: true,
    envService: service
  });

  this.render();

  assert.ok(component.get('isHover'));
});

test('it should not hover if not root', function(assert) {
  assert.expect(1);

  const service = Ember.Service.extend(Ember.Evented).create();

  const component = this.subject({
    isRoot: false,
    envService: service
  });

  this.render();

  assert.notOk(component.get('isHover'));
});

test('it should not hover by parent window', function(assert) {
  assert.expect(2);

  const service = Ember.Service.extend(Ember.Evented).create();

  const parentWindow = this.container.lookup('component:frame/window-frame');

  parentWindow.set('isRoot', true);

  assert.ok(parentWindow.get('isHover'), 'parentHover');

  const component = this.subject({
    isRoot: false,
    envService: service,
    parentView: parentWindow
  });

  this.render();

  assert.ok(component.get('isHover'), 'childHover');
});

test('it should not hover by parent row', function(assert) {
  assert.expect(1);

  const service = Ember.Service.extend(Ember.Evented).create();

  const parentRow = this.container.lookup('component:frame/row-frame');

  parentRow.set('isHover', true);

  const component = this.subject({
    isRoot: false,
    envService: service,
    parentView: parentRow
  });

  this.render();

  assert.ok(component.get('isHover'), 'childHover');
});

test('it should not hover by parent cell', function(assert) {
  assert.expect(1);

  const service = Ember.Service.extend(Ember.Evented).create();

  const parentCell = this.container.lookup('component:frame/cell-frame');

  parentCell.set('isHover', true);

  const component = this.subject({
    isRoot: false,
    envService: service,
    parentView: parentCell
  });

  this.render();

  assert.ok(component.get('isHover'), 'childHover');
});
