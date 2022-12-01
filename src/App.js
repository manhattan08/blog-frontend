import Container from "@mui/material/Container";
import { Header } from "./components/Header";
import { FullPost } from "./pages/FullPost";
import { Home } from "./pages/Home";
import { AddPost } from "./pages/AddPost";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { Route, Routes } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { AdminPanel } from "./pages/AdminPanel";
import { TagsPage } from "./pages/TagsPage";
import { Footer } from "./components/Footer";




function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/posts/:id" element={<FullPost/>}/>
          <Route path="/posts/:id/edit" element={<AddPost/>}/>
          <Route path="/add-post" element={<AddPost/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/admin-panel" element={<AdminPanel/>}/>
          <Route path="/tags/:name" element={<TagsPage/>}/>
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
