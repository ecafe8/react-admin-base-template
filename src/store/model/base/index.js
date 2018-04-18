import { action, extendObservable, isObservableProp } from 'mobx';

export default class Base {

  /**
   * 扩展 observable 属性
   * @param observableProps
   */
  @action extend(observableProps) {
    if (observableProps) {
      extendObservable(this, observableProps);
    }
  }

  /**
   * 更新 observable 属性
   * @param key
   * @param val
   */
  @action update(key, val) {
    if (typeof key === 'object') {
      const keys = Object.keys(key);
      keys.forEach(k => {
        const v = key[k];
        this.update(k, v);
      });
    } else {
      if (isObservableProp(this, key)) {
        this[key] = val;
      } else {
        console.warn(`warning! '${key}' is not observable!`); // 不允许更新非监听状态的键值
      }
    }
  }
}
