import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import SingleBridgeView from './components/SingleBridgeView.tsx'
import { RegisterUser } from './components/RegisterUser.tsx'
import BridgeForm from './components/AddBridge.tsx'
export default createRoutesFromElements(
  <>
    <Route index element={<App />} />
    <Route path="/bridges/:id" element={<SingleBridgeView />} />
    <Route path="/registerUser" element={<RegisterUser />} />
    <Route path="/addBridge" element={<BridgeForm />} />
  </>,
)
