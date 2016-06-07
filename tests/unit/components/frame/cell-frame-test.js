
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('frame/cell-frame', 'Unit | Component | frame/cell-frame', {
  unit: true,
  needs: [
    'component:frame/window-frame',
    'component:frame/row-frame',
    'service:env/keydown',
    'service:env/tizen/keydown'
  ]
});

test('it should have default values', function(assert) {
  assert.expect(3);

  const parentRow = this.container.lookup('component:frame/row-frame');

  parentRow.set('isHover', true);

  const component = this.subject({
    envService: Ember.Service.extend(Ember.Evented).create(),
    parentView: parentRow
  });

  this.render();

  assert.equal(component.get('cellIndex'), 0, 'initial index of cell');
  assert.ok(component.get('isCellFrame'), 'type frame property');
  assert.ok(component.get('isHover'), 'isHover by default');
});
