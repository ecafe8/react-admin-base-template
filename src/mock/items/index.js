import Mock from 'mockjs';
import { output } from '../help';

Mock.mock(/mock.getItemsList/, request => {
  return output({
    list: [],
    total: 0,
  });
});



