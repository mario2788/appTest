
import React, { useState, lazy } from 'react';
import { Routes, Route } from "react-router-dom";

// Mui
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

// Redux Store
import { useSelector } from "react-redux";

// helpers
import temaClaro from './helpers/temaClaro';
import temaOscuro from './helpers/temaOscuro';

//componentes
import { NavBar } from './components/NavBar';
import PreciosLogged from './pages/PreciosLogged';

const Home = lazy(() => import("./pages/Home"));
const Rutas = lazy(() => import("./pages/Rutas"));
const Precios = lazy(() => import("./pages/Precios"));
const Login = lazy(() => import("./pages/Login"));
const RutasCasas = lazy(() => import("./pages/RutasCasas"));
const RutasTiendas = lazy(() => import("./pages/RutasTiendas"));


// Componente principal de la aplicación
function App() {

	const logged = useSelector(state => state.loggedStore.value)
	const [theme, setTheme] = useState('light')

	const styleBox = {
		fontFamily: 'Roboto',
		flexDirection: 'column',
		bgcolor: 'background.default',
		color: 'text.primary',
	}


	return (
		<ThemeProvider theme={theme === 'light' ? temaClaro : temaOscuro}>
			<Box
				sx={styleBox}
			>
				<NavBar setTheme={setTheme} theme={theme} />
				<Routes>

					<Route index
						element={
							<React.Suspense fallback={<>...</>}>
								<Home />
							</React.Suspense>
						}
					/>
					{
						[
							{ path: "/home", render: <Home /> },
							{ path: "/rutas", render: <Rutas /> },
							{ path: "/login", render: <Login theme={theme === 'light' ? temaClaro : temaOscuro} /> },
							{ path: "/precios", render: logged.state ? <PreciosLogged /> : <Precios /> },
							{ path: "/rutas", render: <Rutas /> },
							{ path: "/rutasencasas", render: logged.state ? <RutasCasas /> : <Home /> },
							{ path: "/rutasentiendas", render: logged.state ? <RutasTiendas /> : <Home /> },
						].map((obj, idxObj) =>
							<Route
								key={idxObj}
								path={obj.path}
								element={
									<React.Suspense fallback={<>...</>}>
										{obj.render}
									</React.Suspense>
								}
							/>
						)
					}
				</Routes>
			</Box>
		</ThemeProvider>
	);
}

export default App;