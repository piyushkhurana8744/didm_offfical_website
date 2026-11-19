"use client";
import { Component, type ReactNode } from "react";
export class SceneErrorBoundary extends Component<
  {
    children: ReactNode;
    fallback: ReactNode;
    onError: (error: string) => void;
  },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error) {
    this.props.onError(error.message);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
