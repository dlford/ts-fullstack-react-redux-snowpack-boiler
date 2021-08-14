import React from 'react';
import { Stage, Layer, Path } from 'react-konva';

import Konva from 'konva';

export default function CanvasComponent(): JSX.Element {
  const handleDragStart = (
    event: Konva.KonvaEventObject<DragEvent>,
  ) => {
    if (event.target instanceof Konva.Shape) {
      event.target.fill('lightgray');
    }
  };
  const handleDragEnd = (
    event: Konva.KonvaEventObject<DragEvent>,
  ) => {
    if (event.target instanceof Konva.Shape) {
      event.target.fill('gray');
    }
  };

  return (
    <Stage
      width={window.innerWidth - 32}
      height={window.innerHeight - 32}
    >
      <Layer>
        <Path
          x={20}
          y={20}
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          scale={{ x: 3.5, y: 3.5 }}
          fill='gray'
          data={`m 123.7415,132.80867 a 11.9453,11.9453 0 0 1 -11.9453,11.9453 11.9453,11.9453 0 0 1 -11.945296,-11.9453 11.9453,11.9453 0 0 1 11.945296,-11.9453 11.9453,11.9453 0 0 1 11.9453,11.9453 z`}
        />
      </Layer>
    </Stage>
  );
}
