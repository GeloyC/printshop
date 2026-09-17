import { Document, Page, pdfjs } from 'react-pdf';
import type { ThumbnailType } from './DocumentThumbnail';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();


function ViewPDF ({ file }: ThumbnailType) {
    
    return (
        <div>
            <Document 
                file={file} className="flex h-[150px] w-[150px] overflow-hidden ">
                <Page height={200} width={150} pageNumber={1} renderTextLayer={false}
                    renderAnnotationLayer={false}/>
            </Document>
        </div>
    )
}

export default ViewPDF;