import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import LearnPage from "./pages/LearnPage";
import ListPage from "./pages/ListPage";

function App() {
  return (
    <AppContent>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/learn" element={<LearnPage />} />
      </Routes>
    </AppContent>
  );
}

export default App;

const AppContent = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 560px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
`;
