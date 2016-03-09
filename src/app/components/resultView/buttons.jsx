import React, { PropTypes } from 'react'
import C from '../../constants'
import { Link } from 'react-router'

const styles = {
  button: {
    height: '100px',
    display: 'inline-block',
    cursor: 'pointer'
  }
}

class Buttons extends React.Component {
  constructor( props ) {
    super( props )
    this.state = {
      showSolution: false
    }
  }

  handleShowResult() {
    this.setState({
      showSolution: true
    })
  }

  render() {
    const { handleClick } = this.props
    return (
      <div className='row'>
        <div className='small-4 medium-6 large-8 columns'>
          <Link
            to={ C.ROUTES.START }
          >
            <img
              src={ C.SRC_TO_IMAGES.ICONS.NEW_SOFA }
              alt='Icon for new sofa'
              draggable='false'
              style={ styles.button }
            />
          </Link>
        </div>
        <div
          className='small-4 medium-3 large-2 columns'
          hidden={ this.state.showSolution }
        >
          <img
            src={ C.SRC_TO_IMAGES.ICONS.SHOW_SOLUTION }
            alt='Icon for new sofa'
            draggable='false'
            style={ styles.button }
            onClick={ () => {
              handleClick()
              this.handleShowResult()
            } }
          />
        </div>
        <div
          className='small-4 medium-3 large-2 columns'
          hidden={ !this.state.showSolution }
        ></div>
        <div className='small-4 medium-3 large-2 columns'>
          <Link
            to={ C.ROUTES.GAME }
          >
            <img
              src={ C.SRC_TO_IMAGES.ICONS.ARROW_LEFT }
              alt='Icon for returning to game view'
              draggable='false'
              style={ styles.button }
            />
          </Link>
        </div>
      </div>
    )
  }
}

Buttons.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default Buttons