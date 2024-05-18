import { useEffect, useRef } from 'react'
import { createScene } from '../logic/scene3d'

function RenderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef.current) {
      createScene(canvasRef.current)
    }
  }, [])
  return (
    <>
      <canvas ref={canvasRef} id="render-canvas"></canvas>
    </>
  )
}

export default RenderCanvas
