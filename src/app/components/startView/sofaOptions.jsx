import React, { PropTypes } from 'react'

const styles = {
  img: {
    objectFit: 'scale-down'
  },
  flexContainer: {
    display: 'flex',
    WebkitDisplay: 'flex',
    flexDirection: 'column',
    WebkitFlexDirection: 'column',
    flexWrap: 'nowrap',
    WebkitFlexWrap: 'nowrap',
    justifyContent: 'space-around',
    WebkitJustifyContent: 'space-around',
    alignItems: 'center',
    WebkitAlignItems: 'center',
    alignContent: 'center',
    WebkitAlignContent: 'center',
    height: '100%'
  },
  flexItem: {
    flexGrow: '1',
    WebkitFlexGrow: '1',
    minHeight: '110px'
  },
  arrow: {
    cursor: 'pointer',
    WebkitTransform: 'rotate(90deg)',
    transform: 'rotate(90deg)',
    flex: '0 1 auto',
    WebkitFlex: '0 1 auto',
    maxHeight: '25%',
    maxWidth: '25%'
  },
  sofa: {
    flex: '0 2 auto',
    WebkitFlex: '0 2 auto',
    maxHeight: '50%',
    maxWidth: '100%'
  }
}

const sofa = {
  2: 'two.png',
  3: 'three.png',
  4: 'four.png'
}

const SofaOptions = ( props ) => {
  const {
    selected,
    handleIncreaseNumberOfSeats,
    handleDecreaseNumberOfSeats
  } = props

  const styleArrow = Object.assign(
    {},
    styles.img,
    styles.arrow,
    styles.flexItem
  )

  const styleSofa = Object.assign(
    {},
    styles.img,
    styles.sofa,
    styles.flexItem
  )

  const maxNumberOfSeats = 4
  const minNumberOfSeats = 2

  return (
    <div style={ styles.flexContainer }>
      <div style={ styles.flexItem }>
        <img
          src={ 'public/pics/icons/arrow-left.png' }
          style={ styleArrow }
          onClick={ handleIncreaseNumberOfSeats }
          hidden={ selected >= maxNumberOfSeats }
        ></img>
      </div>
      <img
        src={ 'public/pics/sofas/' + sofa[selected] }
        style={ styleSofa }
      ></img>
      <div style={ styles.flexItem }>
        <img
          src={ 'public/pics/icons/arrow-right.png' }
          style={ styleArrow }
          onClick={ handleDecreaseNumberOfSeats }
          hidden={ selected <= minNumberOfSeats }
        ></img>
      </div>
    </div>
  )
}

SofaOptions.propTypes = {
  selected: PropTypes.number.isRequired,
  handleIncreaseNumberOfSeats: PropTypes.func.isRequired,
  handleDecreaseNumberOfSeats: PropTypes.func.isRequired
}

export default SofaOptions
