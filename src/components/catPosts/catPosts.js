import { Slide } from '../slide/slide'
import { useEffect } from 'react'
import { Slider } from '../slider/slider'
import { $catsData, fetchCatData } from '../../effector'
import { useList, useStore } from 'effector-react';


export function CatPosts() {
  const storeCatsData = useStore($catsData)
  const catDataLenght = storeCatsData.length;

  useEffect(() => {
    fetchCatData()
  }, [])


  const slides = useList($catsData, (item, index) => <Slide key={item.id} img={item.url} index={index} />)

  return (
    <Slider slidersLenght={catDataLenght}>
      {slides}
    </Slider>
  )
}