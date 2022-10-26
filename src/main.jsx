import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./styles.css";
import "animate.css";
import JournalApp from "./JournalApp";
import { store }  from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<JournalApp/>
	</Provider>
);