import RenderCanvas from './components/RenderCanvas'
import DropFilesZone from './components/DropFilesZone'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import { loadFile } from './handlers/files'

const api = window.api

function App() {
  const [isFileLoaded, setIsFileLoaded] = useState(false)
  const loadOpenedFromCtxFile = async () => {
    const file = await api.openFileWithCtx()
    if (file && file.data) {
      await loadFile(file)
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
