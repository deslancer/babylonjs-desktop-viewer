import { useEffect, useRef } from 'react'
import { createScene } from '../logic/scene3d'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import { loadFile } from '../handlers/files'

function RenderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef.current) {
      createScene(canvasRef.current)
    }
  }, [])
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: any[] }) {
        const file = item.files[0]
        loadFile(file)
      },
      canDrop() {
        return true
      },
      hover() {
        //сonsole.log('hover', item.files, item.items)
      },
      collect: (monitor: DropTargetMonitor) => {
        const item = monitor.getItem() as any
        if (item) {
          //console.log('collect', item.files, item.items)
        }

        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        }
      }
    }),
    []
  )
  const isActive = canDrop && isOver
  return (
    <div ref={drop} className={`${isActive ? '' : ''}`} style={{ width: '100vw', height: '100vh' }}>
      <canvas ref={canvasRef} id="render-canvas"></canvas>
    </div>
  )
}

export default RenderCanvas
