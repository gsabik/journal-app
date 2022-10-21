import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import "animate.css";
import JournalApp from "./JournalApp";
import { Provider } from "react-redux";
import { store }  from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
		<JournalApp/>
		</Provider>
	</React.StrictMode>
);