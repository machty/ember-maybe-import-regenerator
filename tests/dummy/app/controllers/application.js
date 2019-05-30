import Controller from '@ember/controller';
import { computed } from '@ember/object';

function * myGen() {
  yield 1;
  yield 2;
  yield 3;
}

export default Controller.extend({
  foo: computed(function() {
    let str = "";
    let iter = myGen();
    str += iter.next().value;
    str += iter.next().value;
    str += iter.next().value;
    return str;
  })
});

