// useContext hook
// context: lets you share data b/w components
// without passing props manually through every level

// Why to use context?
// 1. Helps us avoid prop drilling
// 2. Useful for shared values:
    // - theme details
    // - logged-in user details
    // - language settings
    // - app settings
import { createContext,useContext,useState } from "react";
// Basic steps
// 1. Create components
// 2. Wrap components with Provider
// 3. Read value using useContext()

// 1. Create components
const ThemeContext=createContext();

// Child component
function Header(){
    const theme = useContext(ThemeContext);
    return(
        <header style={{
            padding:"20px",
            marginTop:"20px",
            background: theme==='dark' ? '#222':'#eee',
            color:theme==='dark' ? '#fff':'#000'
        }}>
            <h3>Header Component</h3>
            <p>current theme forn content: {theme}</p>
        </header>
    )
}

// Child component 2
function Content(){
    const theme = useContext(ThemeContext);
    return(
        <div style={{
            padding:'20px',
            marginTop: '20px',
            background: theme === 'dark' ? '#333' : '#f9f9f9',
            color: theme === 'dark' ? '#fff' : '#000',
        }}>
            <p>This component also uses the same content value</p>
        </div>
    )
}
function Layout(){
    return(
        <div>
            <Header />
            <Content />
        </div>
    )
}

export function UseContextIntro(){
    // Shared
    const [theme,setTheme]=useState('light');

    const toggleTheme=()=>{
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    return(
        <section>
            <h2>useContext Hook Example</h2>
            <p>Ex to show the usage of context sharing</p>
            <button onClick={toggleTheme}>
                Toggle Theme
            </button>
            <ThemeContext.Provider value={theme}>
                <Layout />
            </ThemeContext.Provider>
        </section>
    )
}