import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-javascript'
import { useEffect } from 'react'

const CodeBlock = () => {
    useEffect(() => {
      Prism.highlightAll();
    }, [])
    
    return (
        <pre>
          <code className="language-javascript">
            {`function greet(name) {
              console.log('Hello, ' + name + '!');
            }`}
          </code>
        </pre>
      );
}

export default CodeBlock
