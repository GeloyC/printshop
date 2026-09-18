import { Document, Page, pdfjs } from 'react-pdf';
import type { ThumbnailType } from './DocumentThumbnail';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();


function ViewPDF ({ file }: ThumbnailType) {
    
    return (
        <Document file={file} className={'flex items-center justify-center'}>
            <Page width={200} pageNumber={1} renderTextLayer={false}
                renderAnnotationLayer={false}/>
        </Document>
    )
}

export default ViewPDF;