import { Slide } from '../slide/slide'
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

  const slides = catsData.map((item, index) => <Slide key={item.id} img={item.url} index={index} />)

  return (
    <Slider>
      {slides}
    </Slider>
  )
}