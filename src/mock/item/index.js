import Mock, { Random } from 'mockjs';
import {output, queryString, mockApi} from '../helper';

const makeGoods = () => {
  return {
    id: `mock${Random.increment(1000)}`,
    title: Random.ctitle(5, 8),
    pic: Random.dataImage('40x40', '模拟'),
    price: Random.integer(10, 999) + '.00',
    promotionPrice: Random.integer(10, 999) + '.00',
  };
};

mockApi(/mock.item.getList/, ({ request }) => {
  const params = queryString(request.url);

  const { pageSize = 10 } = params;
  const list = [];

  for (let i = 0; i < pageSize; i++) {
    list.push(makeGoods());
  }

  return output({
    list,
    total: Random.integer(50, 140),
  });
});

mockApi(/mock.item.getDetail/, ({ params }) => {

  return output({
    ...makeGoods(),
  });
});
