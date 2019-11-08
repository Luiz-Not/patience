import React from 'react'
import { connect } from 'react-redux'
import CardSlot from './card/CardSlot'
import { getCardPileSelector } from '../redux/selectors'

class DescendingCardList extends React.Component {
  render() {
    const {
      droppable5,
      droppable6,
      droppable7,
      droppable8,
      droppable9,
      droppable10,
      droppable11
    } = this.props

    return(
      <React.Fragment>
        <CardSlot id={5} cards={droppable5} stairs />
        <CardSlot id={6} cards={droppable6} stairs />
        <CardSlot id={7} cards={droppable7} stairs />
        <CardSlot id={8} cards={droppable8} stairs />
        <CardSlot id={9} cards={droppable9} stairs />
        <CardSlot id={10} cards={droppable10} stairs />
        <CardSlot id={11} cards={droppable11} stairs />
      </React.Fragment>
    )
  }
}

const mapStateToprops = state => ({
  droppable5: getCardPileSelector(state, { droppableId: 'droppable5' }),
  droppable6: getCardPileSelector(state, { droppableId: 'droppable6' }),
  droppable7: getCardPileSelector(state, { droppableId: 'droppable7' }),
  droppable8: getCardPileSelector(state, { droppableId: 'droppable8' }),
  droppable9: getCardPileSelector(state, { droppableId: 'droppable9' }),
  droppable10: getCardPileSelector(state, { droppableId: 'droppable10' }),
  droppable11: getCardPileSelector(state, { droppableId: 'droppable11' }),
})

export default connect(mapStateToprops)(DescendingCardList)
