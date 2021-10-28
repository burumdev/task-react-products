import React from 'react';
import './App.scss';

//sections
import HeaderSection from './sections/HeaderSection';
import ProductsSection from './sections/ProductsSection';

function App() {
	return (
		<div className="App">
			<HeaderSection />
			<ProductsSection />
		</div>
	);
}

export default App;
