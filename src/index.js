import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import {ThemeProvider} from './components/ThemeContext';
import Background from './components/Background';
import 'flowbite'
import './utils/i18next'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
            <Provider store={store}>
                <ThemeProvider>
                    <Background>
                        <App/>
                    </Background>
                </ThemeProvider>
            </Provider>
        </Suspense>
    </BrowserRouter>
);