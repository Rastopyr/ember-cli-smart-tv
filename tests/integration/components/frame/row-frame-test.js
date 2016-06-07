import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('frame/row-frame', 'Integration | Component | frame/row frame', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.set('externalAction', function(row) {
    assert.ok(row.get('cells') instanceof Array, 'cells object');
    assert.equal(row.get('hoverIndex'), 0, 'initial hover index');
    assert.ok(row.get('isRowFrame'), 'type frame property');
  });

  this.render(hbs`{{frame/row-frame registerRow=(action externalAction)}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#frame/row-frame registerRow=(action externalAction)}}
      template block text
    {{/frame/row-frame}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
