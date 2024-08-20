import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StudyRecord } from './StudyRecord'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StudyRecord />
  </StrictMode>,
)
