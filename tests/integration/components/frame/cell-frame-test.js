import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('frame/cell-frame', 'Integration | Component | frame/cell frame', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{frame/cell-frame}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#frame/cell-frame}}
      template block text
    {{/frame/cell-frame}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it should bind classes', function(assert) {
  this.render(hbs`
    {{#frame/window-frame}}
      {{#frame/row-frame}}
        {{#frame/cell-frame}}
        {{/frame/cell-frame}}
      {{/frame/row-frame}}
    {{/frame/window-frame}}
  `);

  assert.equal(this.$('.frame-cell-frame').length, 1, 'frame-cell-frame');
  assert.equal(this.$('.hover-cell-frame').length, 1, 'hover-cell-frame');
});
