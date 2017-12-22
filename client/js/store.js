import { EventEmitter } from 'events';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';

class Store extends EventEmitter {
  constructor(defaultState) {
    super();
    this.state = defaultState;
  }

  setState(statePatch) {
    const prevState = cloneDeep(this.state);
    this.state = merge(this.state, statePatch);
    this.emit('change', prevState, this.state);
    return [ prevState, this.state ]
  }
}

export default Store
