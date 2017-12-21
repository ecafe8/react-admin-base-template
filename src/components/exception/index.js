import React, { createElement } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import config from './typeConfig';
import css from './index.less';

export default ({ className, linkElement = 'a', type, title, desc, img, actions, ...rest }) => {
  const pageType = type in config ? type : '404';
  const clsString = classNames(css.exception, className);
  return (
    <div className={clsString} {...rest}>
      <div className={css.imgBlock}>
        <div
          className={css.imgEle}
          style={{ backgroundImage: `url(${img || config[pageType].img})` }}
        />
      </div>
      <div className={css.content}>
        <h1>{title || config[pageType].title}</h1>
        <div className={css.desc}>{desc || config[pageType].desc}</div>
        <div className={css.actions}>
          {
            actions ||
              createElement(linkElement, {
                to: '/',
                href: '/',
              }, <Button type="primary">返回首页</Button>)
          }
        </div>
      </div>
    </div>
  );
};
