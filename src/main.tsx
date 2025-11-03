import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';

import { store } from '@/store/store.ts';
import theme from '@/theme';
import './index.css';
import App from './App.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
                <ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-left" />
            </QueryClientProvider>
        </Provider>
    </StrictMode>,
);
