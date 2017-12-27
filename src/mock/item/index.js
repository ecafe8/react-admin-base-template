import Mock, { Random } from 'mockjs';
import uuid from 'uuid/v4';
import { output, queryString } from '../help';
export function makeItem() {
  return {
    id: Random.increment(),
    key: uuid,
    title: Random.ctitle(10, 20),
    img: Random.dataImage('80x80', '盛夏科技'),
    price: (Random.integer(100, 9999999)),
    time: parseInt(Random.datetime('T')),
  };
}

Mock.mock(/mock.getItemDetail/, request => {
  const params = queryString(request.url);
  const { itemId } = params;
  return output({
    ...makeItem(),
    id: itemId,
  });
});



