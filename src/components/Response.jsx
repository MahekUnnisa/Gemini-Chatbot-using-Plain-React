import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Response = (props) => {
    const { response } = props;

    return (
        <div className="response_container">
            <ReactMarkdown
                children={response}
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ node, children, ...props }) {
                        return <div>
                            <SyntaxHighlighter
                                wrapLongLines={true}
                                wrapLines={true}
                                children={String(children).replace(/\n$/, '')}
                                style={nightOwl}
                                language="javascript"
                                PreTag="div"
                                {...props}
                            />
                        </div>
                    }
                }}
            />
        </div>
    );
};

export default Response;