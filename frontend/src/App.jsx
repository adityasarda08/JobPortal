import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/componentlite/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Jobs from "./components/componentlite/Jobs";
import Browse from "./components/componentlite/Browse";
import Profile from "./components/componentlite/Profile";
import Description from "./components/componentlite/Description";
import Companies from "./components/admincomponents/Companies";
import Addcompanies from "./components/admincomponents/Addcompanies";
import Editcompanies from "./components/admincomponents/Editcompanies";
import Adminjobs from "./components/admincomponents/Adminjobs";
import AddAdminjobs from "./components/admincomponents/addAdminjobs";
import Applicants from "./components/admincomponents/Applicants";
import ProtectedRout from "./components/admincomponents/ProtectedRout";

const appRouter = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/Home", element: <HomePage /> },
  { path: "/Browse", element: <Browse /> },
  { path: "/Profile", element: <Profile /> },
  { path: "/Description/:id", element: <Description /> },

  //admin
  {
    path: "/admin/companies",
    element: (
      <ProtectedRout>
        <Companies />
      </ProtectedRout>
    ),
  },
  {
    path: "/admin/companies/add",
    element: (
      <ProtectedRout>
        <Addcompanies />
      </ProtectedRout>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRout>
        <Editcompanies />
      </ProtectedRout>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRout>
        <Adminjobs />
      </ProtectedRout>
    ),
  },
  {
    path: "/admin/jobs/add",
    element: (
      <ProtectedRout>
        <AddAdminjobs />
      </ProtectedRout>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRout>
        <Applicants />
      </ProtectedRout>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
