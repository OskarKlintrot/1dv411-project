import React, { PropTypes } from 'react'
import listensToClickOutside from 'react-onclickoutside/decorator'
import C from '../../constants'

const styles = {
  box: {
    width: '120%',
    height: 0,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    paddingTop: '135%',
    zIndex: 999,
    position: 'absolute',
    cursor: 'auto'
  },
  colors: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    padding: '5%'
  },
  color: {
    width: '22.5%',
    display: 'inline-block',
    cursor: 'pointer'
  }
}

const colors = []

class ColorPicker extends React.Component {
  constructor( props ) {
    super( props )
    this.handleClickOutside = this.handleClickOutside.bind( this )
    colors.length = 0 // Deleting all elements
    for ( const color in C.COLORS ) {
      if ( C.COLORS.hasOwnProperty( color ) )
        colors.push( C.COLORS[color] )
    }
  }

  handleClickOutside = () => {
    this.props.handleClickOutside()
  };

  getObjectKeyLength = ( obj ) => {
    let length = 0
    for ( const key in obj ) {
      if ( obj.hasOwnProperty( key ) )
        length += 1
    }
    return length
  };

  render() {
    const boxStyle = Object.assign(
      {},
      styles.box,
      {
        backgroundImage: 'url(' + C.SRC_TO_IMAGES.SPEECHBUBBLES[this.props.bearID + 1] + ')',
        top: this.props.topBear ?
          '70%' :
          '-165%',
        right: this.props.bearID % 2 === 1 ?
          '20%' :
          '-38%'
      }
    )
    const bearOverlayStyle = {
      position: 'absolute',
      top: this.props.topBear ?
        '-35%' :
        '',
      bottom: this.props.topBear ?
        '' :
        '-35%',
      left: this.props.bearID % 2 === 1 ?
        '' :
        '7%',
      right: this.props.bearID % 2 === 1 ?
        '5%' :
        '',
      width: '40%',
      height: '50%'
    }

    const colorStyle = Object.assign(
      {},
      styles.color,
      {
        margin: this.props.topBear ?
          '18% 2.5% 0 0' :
          '5% 2.5% 18% 0'
      }
    )

    const noColor = Object.assign(
      {},
      colorStyle,
      {
        opacity: 0.3,
        WebkitFilter: 'grayscale(1) brightness(1.3)',
        cursor: 'default'
      }
    )
    return (
      <div
        className='colorPicker'
        style={ boxStyle }
      >
        <div
          className='bearOverlay'
          style={ bearOverlayStyle }
        />
        <div
          className='colors'
          style={ styles.colors }
        >
          { colors.map( ( color, key ) => {
            if ( color !== C.BEAR_TO_IGNORE ) {
              let showColor = true
              for ( let bear = 0; bear < this.getObjectKeyLength( this.props.bears ); bear += 1 ) {
                if ( this.props.bears[bear].color === color ) {
                  showColor = false
                  break
                }
              }
              return (
                <img
                  className={ 'color' + color }
                  src={ C.SRC_TO_IMAGES.ACCESSORIES[color] }
                  key={ key }
                  onClick={ showColor ? () => this.props.handleBearColorChange( color ) : null }
                  style={ showColor ? colorStyle : noColor }
                  draggable='false'
                />
              )
            }
          }) }
        </div>
      </div>
    )
  }
}

ColorPicker.props = {
  handleClickOutside: PropTypes.func.isRequired,
  handleBearColorChange: PropTypes.func.isRequired,
  topBear: PropTypes.bool.isRequired,
  bears: PropTypes.object.isRequired,
  bearID: PropTypes.number.isRequired
}

export default listensToClickOutside( ColorPicker )
