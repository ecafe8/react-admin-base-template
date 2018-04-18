import Mock, { Random } from 'mockjs';
import { output } from '../help';

Mock.mock(/mock.bool/, request => {
  console.log('request', request);
  const success = Random.boolean(9, 1, true);
  const code = success ? 0 : 1;
  const msg = success ? '' : 'mock operation fail';
  const notice = success ? '' : '操作失败了。(mock 模拟错误)';

  return output({
    success
  }, code, msg, notice);
});

Mock.mock(/mock.ok/, request => {
  return output({
    success: ''
  });
});



