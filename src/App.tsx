import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ToastProvider } from "./context/ToastContext";
import Home from "./pages/Home";

const Menu = lazy(() => import("./pages/Menu"));
const About = lazy(() => import("./pages/About"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Contact = lazy(() => import("./pages/Contact"));
const Reserve = lazy(() => import("./pages/Reserve"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ToastProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="menu" element={<Menu />} />
                  <Route path="about" element={<About />} />
                  <Route path="gallery" element={<Gallery />} />
                  <Route path="reviews" element={<Reviews />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="reserve" element={<Reserve />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
        </ToastProvider>
      </BrowserRouter>
  );
}
