import React from 'react'
import './CardSlot.css'
import { Droppable } from 'react-beautiful-dnd'
import Card from './Card'

export default class CardSlot extends React.Component {
  render() {
    const { id, cards, stairs } = this.props
    const droppableId = `droppable${id}`
    const height = stairs ? cards.length * 20 + 178 : 198
    let lastHeight = 0
    return (
      <Droppable droppableId={droppableId} type="cards">
        {(provided, snapshot) => {
          return (
          <div
            ref={provided.innerRef}
            style={{ height: `${height}px` }}
            {...provided.droppableProps}
            className={ (snapshot.isDraggingOver) ? 'card-slot card-hover block-transform' : 'card-slot' }
          >
            {cards.length > 0 && cards.map((card, index) => {
              let stepHeight = card.back || (!cards[index - 1] || cards[index - 1].back) ? index * 20 : lastHeight + 30
              lastHeight = stepHeight
              return <Card
                  droppableId={droppableId}
                  stairs={stairs}
                  stepHeight={stepHeight}
                  isDragDisabled={card.back || (cards[index - 1] && !cards[index - 1].back && (index + 1) !== cards.length)}
                  card={card}
                  index={index}
                  key={card.id}
                />
              })}
            {provided.placeholder}
          </div>
        )}}
      </Droppable>
    )
  }
}
