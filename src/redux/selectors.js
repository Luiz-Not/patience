export const getMultDragSelector = state => state.store.multDrag
export const getMultDragLengthSelector  = state => state.store.multDrag.length
export const getCardPileSelector = (state, props) => state.store[props.droppableId]
export const getPileCardSelector = state => state.store.pileCards

export const getCompletedCardsSelector = state => {
  const { droppable1, droppable2, droppable3, droppable4 } = state.store
  return droppable1.length + droppable2.length + droppable3.length + droppable4.length
}
