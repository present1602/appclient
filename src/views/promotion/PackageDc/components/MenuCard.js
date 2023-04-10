import { Card, FormContainer, FormItem, Input, Radio } from 'components/ui';
import React, { useState } from 'react';
import classNames from 'classnames'
import { setPackageDcData } from '../store/dataSlice'

const MenuCard = ({ data, index, updateBundleMenu }) => {

  const [itemData, setItemData] = useState(data)
  const [txt, setTxt] = useState('bb')
  // function updateBundleMenu(fields) {
  //   setItemData({ ...itemData, fields })
  // }

  return (

    <div className="card">
      <div className="card-body card-border">
        <div
          className={classNames(
            'grid md:grid-cols-4 gap-4 py-4',
            'border-b border-gray-200 dark:border-gray-600',
          )}
        >
          {/* <input type="text" value={txt} onChange={(e) => setTxt(e.target.value)} /> */}

          <div className="font-semibold">기간</div>
          <FormItem
            className="mb-0 max-w-[700px]"
          >
            <Radio className="mr-4" name="period" defaultChecked>
              <span className='text-base'>4주</span>
            </Radio>
            <Radio className="mr-4" name="period">
              <p className='text-base'>8주</p>
            </Radio>

          </FormItem>
        </div>
        <div
          className={classNames(
            'grid md:grid-cols-4 gap-4 py-4',
            'border-b border-gray-200 dark:border-gray-600',
          )}
        >
          <div className="font-semibold">메뉴명</div>
          <div className="col-span-3">
            <FormItem
              className="mb-0 max-w-[700px]"
            >
              <Input
                value={data.name}
                onChange={(e) => updateBundleMenu(
                  index, { 'name': e.target.value }
                )}
              />
            </FormItem>
          </div>

          <div className="font-semibold">할인가</div>
          <div className="col-span-3">
            <FormItem
              className="mb-0 max-w-[700px]"
            >
              <Input type="number"
                value={data.price}
              // onChange={(e) => updateItemData({
              //   "price": e.target.value
              // })}
              />
            </FormItem>
          </div>

          <div className="font-semibold">정상가</div>
          <div className="col-span-3">
            <FormItem
              className="mb-0 max-w-[700px]"
            >
              <Input type="number"
                value={data.price}
              // onChange={(e) => updateItemData({
              //   "original_price": e.target.value
              // })}
              />
            </FormItem>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MenuCard;