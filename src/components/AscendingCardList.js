import React from 'react'
import { connect } from 'react-redux'
import CardSlot from './card/CardSlot'
import { getCardPileSelector } from '../redux/selectors'

class AscendingCardList extends React.Component {
  render() {
    const { droppable1, droppable2, droppable3, droppable4 } = this.props

    return(
      <React.Fragment>
        <CardSlot id={1} cards={droppable1} />
        <CardSlot id={2} cards={droppable2} />
        <CardSlot id={3} cards={droppable3} />
        <CardSlot id={4} cards={droppable4} />
      </React.Fragment>
    )
  }
}

const mapStateToprops = state => ({
  droppable1: getCardPileSelector(state, { droppableId: 'droppable1' }),
  droppable2: getCardPileSelector(state, { droppableId: 'droppable2' }),
  droppable3: getCardPileSelector(state, { droppableId: 'droppable3' }),
  droppable4: getCardPileSelector(state, { droppableId: 'droppable4' }),
})

export default connect(mapStateToprops)(AscendingCardList)
