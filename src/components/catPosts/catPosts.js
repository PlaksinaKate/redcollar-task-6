import { Slide } from '../slide/slide'
import { useEffect, useState } from 'react'
import { getCats } from '../../api'
import { Slider } from '../slider/slider'


export function CatPosts() {
  const [catData, setCatData] = useState([])
  const catDataLenght = catData.length;

  const getCatsData = async () => {
    const data = await getCats()
    setCatData(data)
  }

  useEffect(() => {
    getCatsData()
  }, [])

  const slides = catData.map((item, index) => <Slide key={item.id} img={item.url} index={index} />)

  return (
    <Slider slidersLenght={catDataLenght}>
      {slides}
    </Slider>
  )
}