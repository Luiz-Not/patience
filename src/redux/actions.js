import { UNHIDDE_CARDS, UPDATE_CARDS } from "./actionTypes";
import {
  getMultDragLengthSelector,
  getCardPileSelector,
  getMultDragSelector,
  getCompletedCardsSelector
} from "./selectors"

const DESCENDING_PILES = ['droppable5', 'droppable6', 'droppable7', 'droppable8', 'droppable9', 'droppable10', 'droppable11']

export const multDragCard = props => (dispatch, getState) => {
  const state = getState()
  const { draggedId, index } = props

  const draggedPile = getCardPileSelector(state, { droppableId: draggedId })

  const isDescendingPile = DESCENDING_PILES.includes(draggedId)
  const lastTurnedCard = !draggedPile[index - 1] || draggedPile[index - 1].back === true
  const hasNextCard = draggedPile[index + 1]

  if (isDescendingPile && lastTurnedCard && hasNextCard) {
    const multDrag = []
    const hiddenCard = draggedPile.map((card, i) => {
      if (i > index) {
        multDrag.push({ ...card })
        return { ...card, hidden: true }
      }
      return { ...card }
    })

    dispatch({
      type: UPDATE_CARDS,
      payload: {
        cards: {
          [draggedId]: hiddenCard,
          multDrag,
          multDragLength: multDrag.length + 1
        }
      }
    })
  }
}

export const dragCard = props => (dispatch, getState) => {
  const state = getState()
  const { droppableId, draggedId, draggableId } = props
  
  const draggedPile = getCardPileSelector(state, { droppableId: draggedId })
  const newCard = draggedPile.find(item => item.id === draggableId)
  const droppedPile = getCardPileSelector(state, { droppableId })

  const isNotFirstCard = droppedPile.length === 0 && newCard.index !== 1
  const isNotNextCard = droppedPile.length && (droppedPile[droppedPile.length - 1].index !== (newCard.index - 1) || droppedPile[droppedPile.length - 1].suit !== newCard.suit)
  const isSameDestination = droppableId === draggedId
  const isPreviousCard = droppedPile.length && (newCard.index + 1) === droppedPile[droppedPile.length - 1].index
  const isFirstCard = droppedPile.length === 0 && newCard.index === 13
  const isSameColor = droppedPile.length && newCard.color === droppedPile[droppedPile.length - 1].color
  const isDescendingPile = DESCENDING_PILES.includes(droppableId)

  if (!isDescendingPile) {
    if (isNotFirstCard || isNotNextCard || isSameDestination) {
      clearHidden(draggedId)
      return null
    }
  } else {
    if ((!isPreviousCard && !isFirstCard) || isSameDestination || isSameColor) {
      clearHidden(draggedId)
      return null
    }
  }

  let newPileCards = draggedPile.filter(card => (card.id !== draggableId))

  const multDrag = getMultDragSelector(state)

  let newCardArray = [newCard]
  if (multDrag.length) {
    newCardArray = [newCard, ...multDrag]
    newPileCards = newPileCards.filter(card => {
      let filter = true
      multDrag.forEach(mult => {
        if (mult.id === card.id) {
          filter = false
          return
        }
      })
      return filter
    })
  }

  dispatch(clearHidden(draggedId))
  dispatch({
    type: UPDATE_CARDS,
    payload: {
      cards: {
        [droppableId]: [...droppedPile, ...newCardArray],
        [draggedId]: newPileCards
      }
    }
  })

  dispatch(checkWin())
}

export const showCard = (card, droppableId, index) => (dispatch, getState) => {
  const state = getState()
  const clickedPile = getCardPileSelector(state, { droppableId })
  const isLastCard = JSON.stringify(clickedPile[clickedPile.length - 1]) === JSON.stringify(card)

  if (isLastCard) {
    const showCard = clickedPile.map((card, i) => {
      if (i === index) {
        delete card.back
        return { ...card }
      }
      return { ...card }
    })

    dispatch({
      type: UPDATE_CARDS,
      payload: {
        cards: {
          [droppableId]: showCard
        }
      }
    })
  }
}

const checkWin = () => (dispatch, getState) => {
  const state = getState()
  const completedCards = getCompletedCardsSelector(state)

  if (completedCards === 52) {
    alert('Ganhou Arrombado!!')
  }
}

export const clearHidden = (droppableId) => (dispatch, getState) => {
  const state = getState()
  const multDragLength = getMultDragLengthSelector(state)

  if (multDragLength) {
    dispatch({
      type: UNHIDDE_CARDS,
      payload: {
        droppableId
      }
    })
  }
}

