import './card';

export const sortCards = (handArray) => {
  handArray.sortBy((cardA, cardB) => cardA.value.position - cardB.value.position)
}
