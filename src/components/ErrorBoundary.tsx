import { Component } from 'react'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
            <h1 className="text-2xl font-bold text-red-600 mb-4">⚠️ Erro na Aplicação</h1>
            <p className="text-gray-700 mb-4">
              Ocorreu um erro ao carregar a aplicação. Por favor, verifica a consola do browser para mais detalhes.
            </p>
            {this.state.error && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-semibold text-gray-600 mb-2">
                  Detalhes do erro
                </summary>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-juni-navy text-white rounded-lg hover:opacity-90"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
