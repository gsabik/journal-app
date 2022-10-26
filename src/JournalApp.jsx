import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import AppTheme from "./theme/AppTheme";

const JournalApp = () => {
    return (
        <AppTheme>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AppTheme>
    );
}

export default JournalApp