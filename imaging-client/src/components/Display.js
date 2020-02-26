import React, { useState, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import { Provider, ReactReduxContext, connect } from 'react-redux';
import Card from './Card';

const Display = () => {
  const [stageWidth, setStageWidth] = useState(window.innerWidth * .75);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setStageWidth(window.innerWidth * .75);
      setStageHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  return(
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Stage className='stage' width={stageWidth} height={stageHeight}>
          <Provider store={store}>
            <Layer>
              <Card />
            </Layer>
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  )
}

const mapStateToProps = (state) => {
  return {
    photos: state.photos
  }
}

export default connect(mapStateToProps)(Display);