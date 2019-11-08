import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import Suits from './Suits'
import { showCard } from '../../redux/actions'
import { getMultDragLengthSelector } from '../../redux/selectors'
import './Card.css'

class Card extends React.Component {
  handleClick = () => {
    const { card, droppableId, index, showCard } = this.props
    if (!card.back) {
      return false
    }
    showCard(card, droppableId, index)
  }

  render() {
    const { card, index, isDragDisabled, stairs, multDragLength, stepHeight } = this.props
    if (!card) {
      return null
    }
    const stairClass = stairs ? `top-${stepHeight}` : ''
    const cardClass = card.back ? 'card card-back' : 'card'
    const hiddenClass = card.hidden ? 'card-hidden' : ''
    return (
      <Draggable isDragDisabled={isDragDisabled} draggableId={`${card.name}-${card.suit}`} index={index || 0}>
        {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`card-wrapper ${stairClass} ${hiddenClass}`}
            >
              <div onClick={this.handleClick} className={cardClass}>
                {!card.back && (
                  <>
                    {snapshot.isDragging && Boolean(multDragLength) && (
                      <div className="card-count">{multDragLength + 1}</div>
                    )}
                    <div className={`card-name ${card.color}`}>{card.name}</div>
                    <div className="card-suit"><Suits suit={card.suit} /></div>
                    <div className={`card-name ${card.color}`}>{card.name}</div>
                  </>
                )}
              </div>
              {provided.placeholder}
            </div>
        )}
      </Draggable>
    )
  }
}

const mapStateToProps = state => ({
  multDragLength: getMultDragLengthSelector(state)
})

export default connect(
  mapStateToProps,
  { showCard }
)(Card)
