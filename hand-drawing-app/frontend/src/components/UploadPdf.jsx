/*import React, { useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// Set the worker source to the local path
pdfjs.GlobalWorkerOptions.workerSrc = unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs;

const UploadPdf = () => {
    const canvasRef = useRef(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [drawing, setDrawing] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);
    const contextRef = useRef(null);

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            const fileUrl = URL.createObjectURL(file);
            setPdfUrl(fileUrl);
            drawPDF(fileUrl);
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    const drawPDF = async (pdfUrl) => {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };

        await page.render(renderContext).promise;
        contextRef.current = context;
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
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
        setLastX(x);
        setLastY(y);
    };

    const stopDrawing = () => {
        setDrawing(false);
    };

    return (
        <div style={{ textAlign: 'center', position: 'relative' }}>
            <canvas
                ref={canvasRef}
                style={{ border: '1px solid black', marginBottom: '10px' }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
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
