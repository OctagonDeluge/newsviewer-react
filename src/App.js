import './App.css';
import News from "./pages/News";
import {Routes, Route, Navigate} from "react-router-dom";
import About from "./pages/About";
import Article from "./pages/Article";
import Bookmarks from "./pages/Bookmarks";
import NotFound from "./pages/NotFound";

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/news">
                    <Route path="/news/:count" element={<News/>} />
                    <Route path="/news/:count/:id" element={<Article/>} />
                </Route>
                <Route path="/bookmarks">
                    <Route path="/bookmarks/:page" element={<Bookmarks/>} />
                </Route>
                <Route path="/about" element={<About/>}/>
                <Route path="" element={<Navigate to="/news/1"/>}/>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </div>
    );
}

export default App;
