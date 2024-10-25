/*import React, { useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';

const UploadPdf = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            const fileUrl = URL.createObjectURL(file);
            setPdfUrl(fileUrl); // Set the URL for the PDF
            setPageNumber(1); // Reset to the first page
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    const startDrawing = (e) => {
        setDrawing(true);
        const rect = canvasRef.current.getBoundingClientRect();
        setLastX(e.clientX - rect.left);
        setLastY(e.clientY - rect.top);
    };

    const draw = (e) => {
        if (!drawing) return;

        const ctx = contextRef.current;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'red'; // Set drawing color
        ctx.lineWidth = 2; // Set line width
        ctx.stroke();
        setLastX(x);
        setLastY(y);
    };

    const stopDrawing = () => {
        setDrawing(false);
    };

    return (
        <div style={{ textAlign: 'center', position: 'relative' }}>
            {pdfUrl && (
                <div style={{ position: 'relative' }}>
                    <canvas
                        ref={canvasRef}
                        style={{ border: '1px solid black', marginBottom: '10px', position: 'absolute', top: 0, left: 0 }}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                    />
                    <Document file={pdfUrl}>
                        <Page pageNumber={pageNumber} width={600} />
                    </Document>
                </div>
            )}
            <input
                type="file"
                accept="application/pdf"
                onChange={handleUpload}
                style={{ display: 'none' }}
                id="upload-pdf"
            />
            <label htmlFor="upload-pdf" style={{ cursor: 'pointer', padding: '10px', background: '#007bff', color: '#fff', borderRadius: '5px' }}>
                Upload PDF
            </label>
        </div>
    );
};

export default UploadPdf;*/
