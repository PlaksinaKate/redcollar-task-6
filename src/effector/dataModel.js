import { createStore, createEffect, createEvent, sample } from "effector";
import { getCats } from "../api";

const fetchCatData = createEvent();

const $catsData = createStore([])

const fetchCatDataFx = createEffect(getCats);

sample({
  clock: fetchCatData,
  target: fetchCatDataFx
})

sample({
  clock: fetchCatDataFx.doneData,
  target: $catsData
})

export const dataModel = {
  $catsData,
  fetchCatData
}