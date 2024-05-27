import React, { useRef } from 'react'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import { loadFile } from '../handlers/files'

interface DropFilesZoneProps {
  setIsFileLoaded: (isFileLoaded: boolean) => void
}

function DropFilesZone(props: DropFilesZoneProps) {
  const { setIsFileLoaded } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDropZoneClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }
  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files
    if (files && files.length > 0) {
      const file = files[0]

      loadFile(file).then(() => {
        setIsFileLoaded(true)
      })
    }
  }
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: any[] }) {
        const file = item.files[0]
        loadFile(file).then(() => {
          setIsFileLoaded(true)
        })
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
    <div ref={drop} onClick={handleDropZoneClick} className={'drop-zone'}>
      <div id={'shell'}></div>
      {isActive ? (
        <span className="drop-zone__prompt">Release to drop</span>
      ) : (
        <div>
          <span className="drop-zone__prompt">Drop file here or </span>
          <br />
          <span className="drop-zone__prompt">click to upload</span>
        </div>
      )}

      <input
        ref={inputRef}
        onChange={handleInputChange}
        type="file"
        id="drop_file_input"
        name="mesh_loader"
        className="drop-zone__input"
      />
    </div>
  )
}

export default DropFilesZone
