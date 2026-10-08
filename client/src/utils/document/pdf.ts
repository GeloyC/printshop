
import * as pdfjsLib from 'pdfjs-dist';

export async function getPdfPageCount (file: File): Promise<number> {
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
    }).promise;

    return pdf.numPages;
}