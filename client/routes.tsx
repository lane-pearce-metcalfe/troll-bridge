import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import SingleBridgeView from './components/SingleBridgeView.tsx'
export default createRoutesFromElements(
  <>
    <Route index element={<App />} />
    <Route path="/bridges/:id" element={<SingleBridgeView />} />
  </>,
)
