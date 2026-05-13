import './App.css'
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import {NestedRoutes} from "./components/P1";
import {DynamicParamsUseParams} from "./components/P2";
import {MultipleDynamicParmas} from "./components/P3";
import {OptionalParams} from "./components/P4";
import {NestedDynamicRoutes} from "./components/P5";

function DashboardHome(){
  return(
    <div>
      <h3>Dashboard Home</h3>
      <p>Default dashboard page.</p>
    </div>
  )
}

function DashboardProfile(){
  return(
    <div>
      <h3>Dashboard Profile</h3>
      <p>Profile Page inside Dashboard</p>
    </div>
  )
}
  
function DashboardSettings(){
  return(
    <div>
      <h3>Dashboard Settings</h3>
      <p>Settings Page inside Dashboard</p>
    </div>
  )
}

function Home(){
  return(
    <div>
      <h1>React Router Concepts</h1>
      <ul>
        <li>NestedRoutes</li>
        <li>DynamicParamsUseParams</li>
        <li>MultipleDynamicParmas</li>
        <li>OptionalParams</li>
        <li>NestedDynamicRoutes</li>
      </ul>
      <nav style={styles.nav}>
        <Link to="/dashboard">Nested Routes</Link> | {' '}
        <Link to="/product/101">Dynamic Params</Link> | {' '}
        <Link to="/user/101/orders/5001">Multiple Dynamic Params</Link> | {' '}
        <Link to="/profile">Optional Params</Link> | {' '}
        <Link to="/profile/harsha">Optional params with value</Link> | {' '}
        <Link to="/courses/reactJS">Nested Dynamic Routes</Link> | {' '}
      </nav>
    </div>
  )
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Home />} 
        />

        {/* Nested route */}
        <Route
          path="/dashboard"
          element={<NestedRoutes />}
        >

          {/* Index Route */}
          <Route
            index
            element={<DashboardHome />}
          />
          <Route
            path="profile"
            element={<DashboardProfile />}
          />
          <Route
            path="settings"
            element={<DashboardSettings />}
          />
        </Route>

        {/* Dynamic params with useParams hook */}
        <Route
          path="/product/:id"
          element={<DynamicParamsUseParams />}
        />
        
        {/* Multiple Dynamic params */}
        <Route
          path="/user/:userId/orders/:orderId"
          element={<MultipleDynamicParmas />}
        />
        
        {/* Optional params */}
        <Route
          path="/profile"
          element={<OptionalParams />}
        />
        <Route
          path="/profile/:username"
          element={<OptionalParams />}
        />

        {/* Nested Dynamic Routes */}
        <Route
          path="/courses/:courseId"
          element={<NestedDynamicRoutes />}
        />
      </Routes>
    </BrowserRouter>
  )
}

const styles={
  nav:{
    display:"flex",
    flexWrap:"wrap",
    gap:"10px",
    marginTop:"20px"
  }
};

export default App
