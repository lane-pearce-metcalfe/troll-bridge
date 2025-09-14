import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import SingleBridgeView from './components/SingleBridgeView.tsx'
import { RegisterUser } from './components/RegisterUser.tsx'
export default createRoutesFromElements(
  <>
    <Route index element={<App />} />
    <Route path="/bridges/:id" element={<SingleBridgeView />} />
    <Route path="/registerUser" element={<RegisterUser />} />
  </>,
)
