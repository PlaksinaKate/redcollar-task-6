import { useEffect } from 'react'
import { Slider } from '../slider/slider'
import { useUnit } from 'effector-react';
import { dataModel } from '../../effector';

export function CatPosts() {
  const [catsData, fetchCatData] = useUnit([
    dataModel.$catsData,
    dataModel.fetchCatData
  ])

  useEffect(() => {
    fetchCatData()
  }, [])

  return (
    <Slider slides={catsData} />
  )
}