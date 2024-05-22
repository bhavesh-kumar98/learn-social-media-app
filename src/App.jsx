import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";

function App() {
  return (
    <>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Header />
          <CreatePost></CreatePost>
          <PostList></PostList>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
