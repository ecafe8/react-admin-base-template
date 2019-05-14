import Mock, { Random } from 'mockjs';
import {output, mockApi} from '../helper';

mockApi(/mock.bool/, ({ request }) => {
  const success = Random.boolean(9, 1, true);
  const code = success ? 0 : 1;
  const msg = success ? '' : 'mock operation fail';
  const notice = success ? '' : '操作失败了。(mock 模拟错误)';

  return output({
    success
  }, code, msg, notice);
});

mockApi(/mock.ok/, ({ request }) => {
  return output({
    success: true
  });
});



