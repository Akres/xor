import React from "react";
import Header from "./header/Header";
import Main from "./Main";
import Footer from "./Footer";

import "./App.less";

export default function App() {
    return (
        <div className="text-center bg-dark text-light h-100 w-100 d-flex flex-column align-items-center">
            <div className="app h-100">
                <Header />
                <Main />
                <Footer />
            </div>
        </div>
    );
}
