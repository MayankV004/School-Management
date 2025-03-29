import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import AddSchoolPage from './components/AddSchoolPage/AddSchoolPage';
import FindSchoolPage from './components/FindSchoolPage/FindSchoolPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="container max-w-6xl mx-auto">
          <Header />
          
          <div className="mt-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddSchoolPage />} />
              <Route path="/find" element={<FindSchoolPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;