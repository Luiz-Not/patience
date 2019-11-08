import React from 'react'
import Card from './Card'
import './CardPile.css'
import { Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { getPileCardSelector } from '../../redux/selectors'

class CardPile extends React.Component {
  state = {
    revealedCard: null
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.cards.length > this.props.cards.length) {
      const previousIndex = prevState.revealedCard - 1
      return {
        revealedCard: previousIndex === -1 ? null : previousIndex
      }
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      this.setState(snapshot)
    }
  }

  revealCard = () => {
    const { revealedCard } = this.state
    const { cards } = this.props
    if (!Number.isInteger(revealedCard)) {
      this.setState({ revealedCard: 0 })
    } else {
      if (revealedCard < cards.length - 1) {
        this.setState(prevState => ({ revealedCard: prevState.revealedCard + 1 }))
      } else {
        this.setState({ revealedCard: null })
      }
    }
  }

  render() {
    const { cards } = this.props
    const { revealedCard } = this.state

    return(
      <Droppable droppableId="pileCards" type="cards">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={ (snapshot.isDraggingOver) ? 'card-slot block-transform' : 'card-slot' }
          >
            <div className="card-pile">
              <div className="card card-back" onClick={this.revealCard} />
              {Number.isInteger(revealedCard) && <div><Card card={cards[revealedCard]} /></div>}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    )
  }
}

const mapStateToProps = state => ({
  cards: getPileCardSelector(state)
})

export default connect(mapStateToProps)(CardPile)
