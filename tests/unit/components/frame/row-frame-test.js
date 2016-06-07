
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('frame/row-frame', 'Unit | Component | frame/row-frame', {
  unit: true,
  needs: [
    'component:frame/window-frame',
    'component:frame/cell-frame',
    'service:env/keydown',
    'service:env/tizen/keydown'
  ]
});

test('it should have default values', function(assert) {
  assert.expect(5);

  const parentWindow = this.container.lookup('component:frame/window-frame');

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create(),
    parentView: parentWindow
  });

  this.render();

  assert.ok(component.get('cells') instanceof Array, 'cells object');
  assert.equal(component.get('rowIndex'), 0, 'initial index of row');
  assert.equal(component.get('hoverIndex'), 0, 'initial hover index');
  assert.ok(component.get('isRowFrame'), 'type frame property');
  assert.ok(component.get('isHover'), 'isHover by default');
});

test('it should register cell', function(assert) {
  assert.expect(2);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create()
  });

  const cell = this.container.lookup('component:frame/cell-frame');

  component.registerCell(cell);

  assert.equal(component.get('cells').length, 1);
  assert.ok(!!~component.get('cells').indexOf(cell));
});

test('it should destroy cell', function(assert) {
  assert.expect(4);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create()
  });

  const cell = this.container.lookup('component:frame/cell-frame');

  component.registerCell(cell);

  assert.equal(component.get('cells').length, 1);
  assert.ok(!!~component.get('cells').indexOf(cell));

  component.destroyCell(cell);

  assert.equal(component.get('cells').length, 0);
  assert.notOk(!!~component.get('cells').indexOf(cell));
});

test('it should register cell by action', function(assert) {
  assert.expect(2);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create()
  });

  const cell = this.container.lookup('component:frame/row-frame');

  component.send('registerCell', cell);

  assert.equal(component.get('cells').length, 1);
  assert.ok(!!~component.get('cells').indexOf(cell));
});

test('it should destroy cell by action', function(assert) {
  assert.expect(4);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create()
  });

  const cell = this.container.lookup('component:frame/cell-frame');

  component.send('registerCell', cell);

  assert.equal(component.get('cells').length, 1);
  assert.ok(!!~component.get('cells').indexOf(cell));

  component.send('destroyCell', cell);

  assert.equal(component.get('cells').length, 0);
  assert.notOk(!!~component.get('cells').indexOf(cell));
});

test('it should change cell index', function(assert) {
  assert.expect(3);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create(),
  });

  const cellA = this.container.lookup('component:frame/cell-frame');
  const cellB = this.container.lookup('component:frame/cell-frame');

  component.registerCell(cellA);
  component.registerCell(cellB);

  assert.equal(component.get('hoverIndex'), 0);

  component.changeCellRight();

  assert.equal(component.get('hoverIndex'), 1);

  component.changeCellLeft();

  assert.equal(component.get('hoverIndex'), 0);
});

test('it should trigger event after change cell right', function(assert) {
  assert.expect(2);

  const service = Ember.Service.extend(Ember.Evented).create();

  const component = this.subject({
    isLoop: true,
    envService: service
  });

  const cellA = this.container.lookup('component:frame/row-frame');
  const cellB = this.container.lookup('component:frame/row-frame');

  component.registerCell(cellA);
  component.registerCell(cellB);

  Ember.run.begin();

  component.one('cellDidChange', function(e) {
    assert.equal(e.direction, 'right');
    assert.equal(component.get('hoverCell'), cellB);

    Ember.run.end();
  });

  component.changeCellRight();
});

test('it should change hover cell', function(assert) {
  assert.expect(3);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create(),
  });

  const cellA = this.container.lookup('component:frame/cell-frame');
  const cellB = this.container.lookup('component:frame/cell-frame');

  component.registerCell(cellA);
  component.registerCell(cellB);

  assert.deepEqual(component.get('hoverCell'), cellA);

  component.changeCellRight();

  assert.deepEqual(component.get('hoverCell'), cellB);

  component.changeCellLeft();

  assert.deepEqual(component.get('hoverCell'), cellA);
});

test('it should change cell to right as loop behavoir', function(assert) {
  assert.expect(3);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create(),
    isLoop: true,

  });

  const cellA = this.container.lookup('component:frame/cell-frame');
  const cellB = this.container.lookup('component:frame/cell-frame');

  component.registerCell(cellA);
  component.registerCell(cellB);

  assert.deepEqual(component.get('hoverCell'), cellA);

  component.changeCellRight();

  assert.deepEqual(component.get('hoverCell'), cellB);

  component.changeCellRight();

  assert.deepEqual(component.get('hoverCell'), cellA);
});

test('it should change cell to left as loop behavoir', function(assert) {
  assert.expect(3);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create(),
    isLoop: true,
  });

  const cellA = this.container.lookup('component:frame/cell-frame');
  const cellB = this.container.lookup('component:frame/cell-frame');

  component.registerCell(cellA);
  component.registerCell(cellB);

  assert.deepEqual(component.get('hoverCell'), cellA);

  component.changeCellLeft();

  assert.deepEqual(component.get('hoverCell'), cellB);

  component.changeCellLeft();

  assert.deepEqual(component.get('hoverCell'), cellA);
});

test('it should hover with parent window', function(assert) {
  assert.expect(1);

  const service = Ember.Service.extend(Ember.Evented).create();
  const parentWindow = this.container.lookup('component:frame/window-frame');

  const component = this.subject({
    isRoot: false,
    envService: service,
    parentView: parentWindow
  });

  this.render();

  assert.ok(component.get('isHover'));
});

test('it not should not hover without parent window', function(assert) {
  assert.expect(1);

  const service = Ember.Service.extend(Ember.Evented).create();

  const component = this.subject({
    isRoot: false,
    envService: service,
  });

  this.render();

  assert.notOk(component.get('isHover'));
});
