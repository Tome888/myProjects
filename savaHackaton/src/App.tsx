import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { NavBar } from "./components/NavBar";
import { RegisterPage } from "./pages/Register";
import SignInPage from "./components/SignInPage/SignInPage";
import { SideBar } from "./components/SideBar";
import { PageContainer } from "./components/PageContainer";
import { SearchBar } from "./components/SearchBar";
import { MyProfile } from "./pages/MyProfile";

import Damages from "./components/Damages/Damages";
import Invoices from "./components/Invoices/Invoices";
import PolicyInside from "./components/Policy/PolicyInside";
// import { ProtectedRoute } from './components/RouteValidation';
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(true);

  useEffect(() => {
    console.log(token);
    console.log(Boolean(token));
    const getToken = localStorage.getItem("token");
    const parsedToken = JSON.parse(getToken!);
    setToken(parsedToken);
  }, [token]);

  const router = createBrowserRouter([
    {
      path: "*",
      element: (
        <>
          <NavBar />
          <p>Page Not Found</p>
        </>
      ),
    },
    {
      path: "/",
      element: (
        <>
          <LandingPage />
        </>
      ),
    },
    {
      path: "/signIn",
      element: (
        <>
          <SignInPage setToken={setToken} />
        </>
      ),
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/myProfile",
      element: (
        <section className="containerSection">
          <SideBar />
          <PageContainer>
            <SearchBar />
            <MyProfile />
          </PageContainer>
        </section>
      ),
    },
    {
      path: "/policies",
      element: (
        <section className="containerSection">
          <SideBar />
          <PageContainer>
            <SearchBar />
            <PolicyInside />
          </PageContainer>
        </section>
      ),
    },
    {
      path: "/damages",
      element: (
        <section className="containerSection">
          <SideBar />
          <PageContainer>
            <SearchBar />
            <Damages />
          </PageContainer>
        </section>
      ),
    },
    {
      path: "/invoices",
      element: (
        <section className="containerSection">
          <SideBar />
          <PageContainer>
            <SearchBar />
            <Invoices />
          </PageContainer>
        </section>
      ),
    },
    {
      path: "/contact",
      element: (
        <section className="containerSection">
          <SideBar />
          <PageContainer>
            <SearchBar />
            <p>contact</p>
          </PageContainer>
        </section>
      ),
    },
    {
      path: "/settings",
      element: (
        <section className="containerSection">
          <SideBar />
          <PageContainer>
            <SearchBar />
            <p>settings</p>
          </PageContainer>
        </section>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
