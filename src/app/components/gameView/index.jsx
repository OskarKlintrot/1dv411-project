import React, { PropTypes } from 'react'
import C from '../../constants'
import Sofa from './sofa'
import DraggedTeddy from './draggedBear'
import StartingArea from './startingArea'
import Seat from './seat'
import Buttons from './buttons'
import DraggableBear from './draggableBear.jsx'
import { connect } from 'react-redux'
import Actions from '../../redux/actions/'

// React Drag and Drop
import { DragDropContext } from 'react-dnd'
import touchBackend from 'react-dnd-touch-backend'

/* TODO: Below is a suggestion for a standard format for data to store in redux.
 *  At the moment it's stored like that. May change in the future.
 *  Number of seats is determined by teddySeatArray.length
 *
 * const teddySeatArray = [
 *   "orange",
 *   null,
 *   "blue",
 *   "green"
 * ]
 * const teddyStartingAreaArray = [
 *   "pink"
 *   null,
 *   null,
 *   null
 * ]
 */

class GameView extends React.Component {
  constructor( props ) {
    super( props )
    this.state = {
      currentlyDraggedObj: {
        color: C.COLORS.WHITE,
        srcIndex: 0,
        srcTypeName: C.COMPONENT_NAMES.STARTING_AREA
      }
    }
  }

  handleDrop( containerTypeName, index ) {

    if ( containerTypeName === C.COMPONENT_NAMES.SOFA ) {

      // Add bear to new sofa seat
      this.props.addBearToSofa( this.state.currentlyDraggedObj.color, index )

      // Remove bear from previous seat
      if ( this.state.currentlyDraggedObj.srcTypeName === C.COMPONENT_NAMES.STARTING_AREA )
        // From Starting area
        this.props.removeBearFromStart( this.state.currentlyDraggedObj.srcIndex )

      else if ( this.state.currentlyDraggedObj.srcTypeName === C.COMPONENT_NAMES.SOFA )
        // From Sofa
        this.props.removeBearFromSofa( this.state.currentlyDraggedObj.srcIndex )

    }

    if ( containerTypeName === C.COMPONENT_NAMES.STARTING_AREA ) {

      // Add bear to new Starting area seat
      this.props.addBearToStart( this.state.currentlyDraggedObj.color, index )

      // Remove bear from previous seat
      if ( this.state.currentlyDraggedObj.srcTypeName === C.COMPONENT_NAMES.STARTING_AREA )
        // From Starting area seat
        this.props.removeBearFromStart( this.state.currentlyDraggedObj.srcIndex )

      else if ( this.state.currentlyDraggedObj.srcTypeName === C.COMPONENT_NAMES.SOFA )
        // From sofa seat
        this.props.removeBearFromSofa( this.state.currentlyDraggedObj.srcIndex )
    }
  }

  handleBeginDrag( containerTypeName, index, color ) {
    this.setState(
      {
        currentlyDraggedObj: {
          color: color,
          srcIndex: index, // We need to save the dragged source index, so we later know which index to delete on successful drop.
          srcTypeName: containerTypeName // Same with type (distinguish between Sofa and Starting Area source type)
        }
      }
    )
  }

  savePermutation() {
    this.props.savePermutation( this.props.bearsOnSofa )
  }

  resetPermutation() {
    this.props.resetPermutation()
  }

  renderSeat( teddyColor, seatIndex, containerTypeName ) {

    // Bind 'this' to GameView on passed methods
    const handleDrop = this.handleDrop.bind( this )
    const handleBeginDrag = this.handleBeginDrag.bind( this )

    const bear = typeof teddyColor === "string" ?
      <DraggableBear
        key={ seatIndex }
        index={ seatIndex }
        onBeginDrag={ handleBeginDrag }
        color={ teddyColor }
        containerTypeName={ containerTypeName }
      /> :
      null

    return (
      <Seat
        key={ seatIndex }
        index={ seatIndex }
        onDrop={ handleDrop }
        canDrop={ bear === null }
        containerTypeName={ containerTypeName }
      >
        { bear }
      </Seat>
    )
  }

  render() {
    const styles = {
      gameScene: {
        height: window.innerHeight + 'px'
      }
    }

    // Bind 'this' to GameView on passed methods
    const resetPermutation = this.resetPermutation.bind( this )

    return (
      <div style={ styles.gameScene } >

        <Buttons
          onRestart={ resetPermutation }
        />

        <Sofa
          scale={ 1 }
          numberOfSeats={ this.props.bearsOnSofa.length }
        >
          {
            this.props.bearsOnSofa.map( ( color, index ) =>
              this.renderSeat( color, index, C.COMPONENT_NAMES.SOFA )
            )
          }
        </Sofa>

        <StartingArea>
          {
            this.props.bearsOnStart.map( ( color, index ) =>
              this.renderSeat( color, index, C.COMPONENT_NAMES.STARTING_AREA )
              )
          }
        </StartingArea>

        <DraggedTeddy color={ this.state.currentlyDraggedObj.color } />

      </div>
    )
  }
}

GameView.propTypes = {

  bearsOnSofa: PropTypes.array.isRequired,
  bearsOnStart: PropTypes.array.isRequired,

  addBearToSofa: PropTypes.func.isRequired,
  removeBearFromSofa: PropTypes.func.isRequired,
  addBearToStart: PropTypes.func.isRequired,
  removeBearFromStart: PropTypes.func.isRequired,
  resetPermutation: PropTypes.func.isRequired,
  savePermutation: PropTypes.func.isRequired
}

const mapStateToProps = ( state ) => state.game

const mapDispatchToProps = ( dispatch ) => {
  return {
    addBearToSofa: ( color, position ) => {
      dispatch( Actions.addBearToSofa( color, position ) )
    },
    removeBearFromSofa: ( position ) => {
      dispatch( Actions.removeBearFromSofa( position ) )
    },
    addBearToStart: ( color, position ) => {
      dispatch( Actions.addBearToStart( color, position ) )
    },
    removeBearFromStart: ( position ) => {
      dispatch( Actions.removeBearFromStart( position ) )
    },
    resetPermutation: ( position ) => {
      dispatch( Actions.resetPermutation( position ) )
    },
    savePermutation: ( combination ) => {
      dispatch( Actions.savePermutation( combination ) )
    }
  }
}

const connectObj = connect( mapStateToProps, mapDispatchToProps )( GameView )
export default DragDropContext(
  touchBackend({ enableMouseEvents: true })
)( connectObj )
