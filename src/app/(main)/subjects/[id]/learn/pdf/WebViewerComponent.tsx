'use client';
import { useEffect, useRef } from 'react';
import WebViewer from '@pdftron/webviewer';

type Props = {
  fileUrl: string;
};

const WebViewerComponent = ({ fileUrl }: Props) => {
  const viewerDiv = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: '/lib', // path to the WebViewer's 'lib' folder
        initialDoc: fileUrl,
      },
      viewerDiv.current!
    );
  }, [fileUrl]);

  return <div ref={viewerDiv} style={{ height: '100vh', width: '100%' }} />;
};

export default WebViewerComponent;
