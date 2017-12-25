import Mock, { Random } from 'mockjs';
import { output, queryString } from '../help';
import { makeItem } from '../item';

Mock.mock(/mock.getItemsList/, request => {
  const params = queryString(request.url);
  const { pageSize = 10 } = params;
  const list = [];

  for (let i = 0; i < pageSize; i++) {
    list.push(makeItem());
  }

  return output({
    list,
    total: Random.integer(50, 140),
  });
});



