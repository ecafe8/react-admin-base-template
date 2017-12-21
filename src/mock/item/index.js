import Mock from 'mockjs';
import { output } from '../help';

Mock.mock(/mock.getItemDetail/, request => {
  return output({
    list: [],
    total: 0,
  });
});



