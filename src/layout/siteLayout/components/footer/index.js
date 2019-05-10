import React from 'react';
import classNames from 'classnames';
import css from './index.less';

export default ({ className, links, copyright }) => {
  const clsString = classNames(css.globalFooter, className);
  return (
    <div className={clsString}>
      {
        links && (
          <div className={css.links}>
            {links.map(link => (
              <a
                key={link.title}
                target="_blank"
                href={link.href}
              >
                {link.title}
              </a>
            ))}
          </div>
        )
      }
      {copyright && <div className={css.copyright}>{copyright}</div>}
    </div>
  );
};
