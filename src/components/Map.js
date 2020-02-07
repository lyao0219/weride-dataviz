import React, { memo } from 'react'
import PropTypes from 'prop-types'

function Map(props) {
  const { name } = props

  return (
      <div className="map">
        <div>🗺 This is the { name } component 🗺</div>
      </div>
  )
}

Map.defaultProps = {
  name: "",
};

Map.propTypes = {
  name: PropTypes.string,
};

export default memo(Map)
