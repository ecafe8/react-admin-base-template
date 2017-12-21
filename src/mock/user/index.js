import Mock from 'mockjs';
import { output } from '../help';

Mock.mock(/mock.getCurrentUser/, request => {
  return output({
    avatar: '//gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
    nick: '@cname',
    subNick: '@cname',
    'isSubAccount|1': '@boolean',
  });
});



