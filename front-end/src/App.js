import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom"
import Intro from "./Intro"
import Home from "./Home"
import Post from "./PostInterview"
import Complete from "./Complete"
import Resumes from "./Resumes"
import Interviews from "./Interviews"
import ClientTest from "./clientTest"
import Candidate from "./PostInterviewCandidate"
import ApplicationVideo from "./ApplicationVideo"
import AdminPage from "./AdminPage";
import Login from "./Login";



function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="intro" element={<Intro />} />
        <Route path="post-interview" element={<Post />} />
        <Route path="post-interview-candidate/:school/:id" element={<Candidate />} />
        <Route path="application-video/:name/:school" element={<ApplicationVideo/>} />
        <Route path="online-sim-complete" element={<Complete />} />
        <Route path="resumes" element={<Resumes />} />
        <Route path="interviews" element={<Interviews />} />
        <Route path="complete" element={<Complete />} />
        <Route path="clientTest" element={<ClientTest />} />
        <Route path="adminpage" element={<AdminPage />} />
        <Route path="login" element={<Login />} />



      </Routes>

    </div>

  );
}


export default App;


