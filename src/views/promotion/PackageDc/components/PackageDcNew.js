import { Button, Card, FormContainer, FormItem, Input, Radio } from 'components/ui';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames'
import MenuCard from './MenuCard';
import { injectReducer } from 'store';
import reducer from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { setPackageDcData, setBundleMenu } from '../store/dataSlice'
import { AdaptableCard } from 'components/shared';


injectReducer('packageDcData', reducer)

const PackageDcNew = () => {

  const persistData = useSelector((state) => state.packageDcData.data.packageDc)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState(persistData)

  function updateFields(fields) {
    // dispatch(setPackageDcData(fields))
    setFormData(fields)
  }

  function updateBundleMenu(index, fields) {
    // const newData = { ...persistData.bundleMenu[index], ...fields }
    // setFormData(
    //   ...formData, ...formData.bundleMenu
    // )
  }

  useEffect(() => {
    console.log("persistData : ", persistData)
  }, [])

  return (
    <div className='max-w-[768px]'>
      <h5 className='mb-5 mt-5'>패키지할인 등록</h5>

      <FormContainer>

        <FormItem
          label="프로모션명"
        >
          <Input
            value={persistData.name}
            name="name"
            placeholder="프로모션명을 입력해주세요"
            onChange={
              (e) => updateFields({
                'name': e.target.value
              })
            } />
        </FormItem>
        <FormItem
          label="설명"
        >
          <Input
            value={formData.description}
            name="description"
            placeholder="프로모션정보를 입력해주세요"
            onChange={
              (e) => updateFields({
                'description': e.target.value
              })
            }
          />
        </FormItem>

        <div className="mt-4 text-right">
          <Button
            onClick={() => { }}
          >
            저장
          </Button>
        </div>



        {
          formData.bundleMenu.map((element, index) => {
            return <MenuCard data={element} index={index} updateBundleMenu={updateBundleMenu} />
          })
        }


        {/* 
        
        <div className="card">
          <div className="card-body card-border">
            <MenuCard label={"기간"}>

              <FormItem
                className="mb-0 max-w-[700px]"
              >
                <Radio className="mr-4" name="period" defaultChecked>
                  <span className='text-base'>4주</span>
                </Radio>
                <Radio className="mr-4" name="period">
                  <p className='text-base'>4주</p>
                </Radio>

              </FormItem>
            </MenuCard>
            <div
              className={classNames(
                'grid md:grid-cols-4 gap-4 py-4',
                'border-b border-gray-200 dark:border-gray-600',
              )}
            >
              <div className="font-semibold">기간</div>
              <div className="col-span-2">
                <FormItem
                  className="mb-0 max-w-[700px]"
                >
                  메뉴명
                </FormItem>
              </div>
            </div>
          </div>
        </div> */}

      </FormContainer>

    </div>
  );
}

export default PackageDcNew;