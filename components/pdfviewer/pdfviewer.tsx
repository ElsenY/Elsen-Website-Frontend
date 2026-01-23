"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { pdfjs } from "react-pdf";

// Dynamically import only the React components
const Document = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  { ssr: false }
);
const Page = dynamic(
  () => import("react-pdf").then((mod) => mod.Page),
  { ssr: false }
);

interface PDFViewerProps {
  fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.2);

  useEffect(() => {
    // Browser‑only worker setup
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }, []);

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
  };

  const zoomIn = () => setScale((prev) => prev + 0.2);
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={zoomOut}>- Zoom</button>
        <button onClick={zoomIn} style={{ marginLeft: 10 }}>
          + Zoom
        </button>
      </div>

      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            scale={scale}
          />
        ))}
      </Document>
    </div>
  );
};

export default PDFViewer;
