import React, { Component, ErrorInfo } from 'react';

export interface ErrorBoundaryProps {
  children: JSX.Element | JSX.Element[];
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render(): JSX.Element | JSX.Element[] {
    if (this.state.hasError) {
      return <div>ERROR</div>;
    }

    return this.props.children;
  }
}
