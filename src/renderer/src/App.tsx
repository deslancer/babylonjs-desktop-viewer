import RenderCanvas from './components/RenderCanvas'
import DropFilesZone from './components/DropFilesZone'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import loadMesh from './logic/loadMesh'

const api = window.api

function App() {
  const [isFileLoaded, setIsFileLoaded] = useState(false)
  const loadOpenedFromCtxFile = async () => {
    const file = await api.openFileWithCtx()
    if (file && file.data) {
      await loadMesh(file.data)
      setIsFileLoaded(true)
    }
  }
  useEffect(() => {
    loadOpenedFromCtxFile()
  }, [])
  return (
    <DndProvider backend={HTML5Backend}>
      {isFileLoaded ? <Header /> : <DropFilesZone setIsFileLoaded={setIsFileLoaded} />}
      <RenderCanvas />
    </DndProvider>
  )
}

export default App
