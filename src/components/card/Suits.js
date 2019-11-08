import React from 'react'
import './Suits.css'

export default class Suits extends React.Component {
  render() {
    const { suit } = this.props
    return (
      <div className={suit}>
        {(suit === 'spade' || suit === 'heart' || suit === 'diamond') && (
          <div className="square"></div>
        )}
        {(suit === 'spade' || suit === 'heart' || suit === 'club') && (
          <>
            <div className="circle1"></div>
            <div className="circle2"></div>
          </>
        )}
        {(suit === 'club') && (
          <div className="circle3"></div>
        )}
        {(suit === 'spade' || suit === 'club') && (
          <div className="tail"></div>
        )}
      </div>
    )
  }
}