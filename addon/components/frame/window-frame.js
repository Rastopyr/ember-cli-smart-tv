
import Ember from 'ember';
import WindowMixin from 'ember-cli-smart-tv/mixins/frame/window-frame';

export default Ember.Component.extend(WindowMixin, {
  classNameBindings: ['isHover:hover-window-frame']
});
