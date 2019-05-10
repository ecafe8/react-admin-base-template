import { createContext } from 'react';

/**
 * 父组件 注入
 * <GlobalContext.Provider value={123}>
 *   {children}
 * </GlobalContext.Provider>
 *
 * 子组件 使用
 * 在需要使用的地方引入本文件
 * <GlobalContext.Consumer>
 *   {value => <ChildComponent {...props} value={value} />}
 * </GlobalContext.Consumer>
 */
export default createContext();
