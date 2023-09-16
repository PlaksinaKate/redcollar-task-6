import { CATS_API } from "../consts";

export async function getCats() {
  try {
    const response = await fetch(`${CATS_API}`);
    const data = await response.json()
    return data;
  } catch(error) {
    throw new Error(error)
  }
}