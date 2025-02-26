
import React, { useState, lazy } from 'react';
import { Routes, Route, Link, Outlet } from "react-router-dom";

// Mui
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

// Redux store
import { useSelector } from "react-redux";

// helpers
import temaClaro from './helpers/temaClaro';
import temaOscuro from './helpers/temaOscuro';

//componentes
import { NavBar } from './components/NavBar';
import SignIn from './sign-in/SignIn';
const Home = lazy(() => import("./pages/Home"));
const Rutas = lazy(() => import("./pages/Rutas"));
const Precios = lazy(() => import("./pages/Precios"));


// Componente principal de la aplicación
function App() {

	const [theme, setTheme] = useState('light')
	// const path = useSelector(state => state.pathStore.value)
	const logged = useSelector(state => state.loggedStore.value)
	console.log("logged-home", logged);

	const styleBox = {
		fontFamily: 'Roboto',
		flexDirection: 'column',
		bgcolor: 'background.default',
		color: 'text.primary',
		height: '60vh'
	}


	return (
		<ThemeProvider theme={theme === 'light' ? temaClaro : temaOscuro}>
			<Box
				sx={styleBox}
			>
				<NavBar setTheme={setTheme} theme={theme} />
				<Routes>

					<Route index element={
						<React.Suspense fallback={<>...</>}>
							<Home />
						</React.Suspense>
					} />

					<Route
						path="/home"
						element={
							<React.Suspense fallback={<>...</>}>
								<Home />
							</React.Suspense>
						}
					/>

					<Route
						path="/rutas"
						element={
							<React.Suspense fallback={<>...</>}>
								<Rutas />
							</React.Suspense>
						}
					/>

					<Route
						path="/precios"
						element={
							<React.Suspense fallback={<>...</>}>
								<Precios />
							</React.Suspense>
						}
					/>

					<Route
						path="/login"
						element={
							<React.Suspense fallback={<>...</>}>
								<SignIn theme={theme === 'light' ? temaClaro : temaOscuro} />
							</React.Suspense>
						}
					/>
				</Routes>
			</Box>
		</ThemeProvider>
	);
}

export default App;