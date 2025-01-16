import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'

import { HelmetProvider } from 'react-helmet-async';

import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from './utils/customTheme.js';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// attempted fix for syntax highligting render bug
ReactDOM.createRoot(document.createElement('div')).render(
  // eslint-disable-next-line react/no-children-prop
  <SyntaxHighlighter language="" children={''} />
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={customTheme}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ChakraProvider>,
)
