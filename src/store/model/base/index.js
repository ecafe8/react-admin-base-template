import { action, extendObservable, isObservableProp } from 'mobx';
import { guid } from 'common/utils';

export default class Base {

  id = guid({});

  constructor(args) {}

  /**
   * 更新属性
   * @param props
   */
  setProps(props) {
    Object.keys(props).map(key => {
      if (props[key] !== undefined) {
        this[key] = props[key];
      }
    });
  }


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
    const _set = (k, v) => {
      if (v !== undefined && isObservableProp(this, k)) {
        this[k] = v;
      } else {
        if (__DEV__) {
          console.warn(`sx:warning! '${k}' is not observable!`); // 不允许更新非监听状态的键值
        }
      }
    };
    if (typeof key === 'object') {
      const keys = Object.keys(key);
      keys.forEach(k => {
        const v = key[k];
        _set(k, v);
      });
    } else {
      _set(key, val);
    }
  }
}
