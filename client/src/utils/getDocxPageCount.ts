import JSZip from "jszip";

export async function getDocxPageCount (file: File) {
    try {
        const zip = await JSZip.loadAsync(file);

        const appXml = zip.file("docProps/app.xml");
        if (!appXml) return null;

        const xmlString = await appXml.async("text");

        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, "application/xml");
        if (xml.querySelector("parseerror"))  return null;

        const pageElement = Array.from(
            xml.getElementsByTagName("*")
        ).find(element => element.localName === "Pages");
        if (!pageElement) return null;

        const pages = Number(pageElement.textContent)

        return Number.isInteger(pages) && pages > 0
            ? pages
            : null;

    } catch (err) {
        console.error("DOCX analysis failed:", err);
        return null;
    }
}