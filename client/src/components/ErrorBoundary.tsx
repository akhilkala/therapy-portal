import React, { Component } from "react";
import Animation from "./Animation";

export default class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  static getDerivedStateFromError(error: Error) {
    return { error: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log(error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary screen-center">
          <Animation animation="error" width={500} loop={false} />
          <h1>Something went wrong</h1>
        </div>
      );
    }

    return this.props.children;
  }
}
