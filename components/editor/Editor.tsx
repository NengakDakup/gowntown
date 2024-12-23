'use client';

import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './editor.css';

interface QuillEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  value = '',
  onChange,
  placeholder = 'Start writing...',
  readOnly = false,
  className = '',
  style = {}
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    if (!quillRef.current) {
      const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
      ];

      quillRef.current = new Quill(editorRef.current, {
        modules: {
          toolbar: toolbarOptions
        },
        theme: 'snow',
        placeholder,
        readOnly
      });

      // Set initial content
      if (value) {
        quillRef.current.root.innerHTML = value;
      }

      // Handle content changes
      quillRef.current.on('text-change', () => {
        const content = quillRef.current?.root.innerHTML || '';
        onChange?.(content);
      });
    }

    return () => {
      if (quillRef.current) {
        // Clean up event listeners
        quillRef.current.off('text-change');
      }
    };
  }, []); // Empty dependency array since we only want to initialize once

  // Handle value updates from parent
  useEffect(() => {
    if (quillRef.current && value !== undefined && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div className={`quill-editor-container ${className}`} style={style}>
      <div ref={editorRef} style={{ height: '100px' }} />
      <style jsx>{`
        .quill-editor-container {
          width: 100%;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default QuillEditor;
