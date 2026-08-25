import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

const AllProviders = ({ children }) => {
    return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (ui, options = {}) => {
    return render(ui, {
        wrapper: AllProviders,
        ...options,
    });
};

// Re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };