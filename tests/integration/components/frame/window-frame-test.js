
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('frame/window-frame', 'Integration | Component | frame/window frame', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{frame/window-frame}}`);

  assert.equal(this.$().text().trim(), '');

  this.render(hbs`
    {{#frame/window-frame}}
      template block text
    {{/frame/window-frame}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it should register child rows', function(assert) {

  this.set('externalAction', function(row) {
    assert.ok(row.get('cells') instanceof Array, 'cells object');
    assert.equal(row.get('hoverIndex'), 0, 'initial hover index');
    assert.ok(row.get('isRowFrame'), 'type frame property');
    assert.ok(row.get('isHover'), 'isHover by default');
  });

  this.render(hbs`
    {{#frame/window-frame}}
      {{#frame/row-frame registerRow=(action externalAction)}}
      {{/frame/row-frame}}
    {{/frame/window-frame}}
  `);

  assert.equal(this.$('.frame-window-frame').length, 1);
  assert.equal(this.$('.hover-window-frame').length, 1, 'Hovered window count');
  assert.equal(this.$('.frame-window-frame > .frame-row-frame').length, 1);
});
