import React from 'react'
import Error from './pages/Error';

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("App crashed:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <Error
                title="Something went wrong"
                message="We ran into an unexpected issue while loading this page. Our system couldn't complete the request at this time."
                advice_note="This is not your fault. Please try refreshing the page or come back later.If the issue persists, contact support."
            />
        }
        return this.props.children;
    }

}

export default ErrorBoundary;