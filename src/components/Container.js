import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import CardPile from './card/CardPile'
import CardStairsList from './DescendingCardList'
import AscendingCardList from './AscendingCardList'
import './Container.css'

import { dragCard, clearHidden, multDragCard } from '../redux/actions'

class Container extends React.Component {
  onDragStart = (event) => {
    const { source } = event
    const { droppableId, index } = source
    const { multDragCard } = this.props
    multDragCard({ draggedId: droppableId, index })
  }

  onDragEnd = (event) => {
    const { draggableId, destination, source } = event
    const { clearHidden, dragCard } = this.props
    if (!destination) {
      clearHidden(source.droppableId)
      return null
    }

    const { droppableId } = destination
    dragCard({ droppableId, draggedId: source.droppableId, draggableId })
  }

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <div className="container">
          <div className="row deck-row">
            <div className="deck">
              <CardPile />
            </div>
            <div className="slots">
              <AscendingCardList />
            </div>
          </div>
          <div className="row deck-row">
            <CardStairsList />
          </div>
        </div>
      </DragDropContext>
    )
  }
}

export default connect(
  null,
  { clearHidden, dragCard, multDragCard }
)(Container);
