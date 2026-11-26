import React, {useState} from 'react';
import Header from './components/public/Header';
import HomeView from './pages/public/HomePage';
import {customStyles} from './styles/publicStyles';
const App = () => { const [view,setView] = useState('home'); return <div className="font-sans selection:bg-amber-400 selection:text-slate-950 text-slate-950 bg-slate-50 antialiased min-h-screen"><style dangerouslySetInnerHTML={{__html:customStyles}}/><Header setView={setView}/><HomeView setView={setView}/></div>; }; export default App;
