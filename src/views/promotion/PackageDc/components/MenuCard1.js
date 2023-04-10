import React from 'react';
import classNames from 'classnames'

const MenuCard1 = ({ children, label }) => {
  return (

    <div
      className={classNames(
        'grid md:grid-cols-4 gap-4 py-4',
        'border-b border-gray-200 dark:border-gray-600',
      )}
    >
      <div className="font-semibold">{label}</div>
      {children}
    </div>
  );
}

export default MenuCard1;