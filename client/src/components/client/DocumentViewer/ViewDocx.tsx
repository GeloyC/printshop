import { useEffect, useState } from "react";
import mammoth from "mammoth";
import html2canvas from "html2canvas";

import type { ThumbnailType } from "./DocumentThumbnail";

const THUMBNAIL_WIDTH = 200;
const THUMBNAIL_HEIGHT = 283;

function ViewDocx({ file }: ThumbnailType) {
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let cancelled = false;
        let container: HTMLDivElement | null = null;

        const generateThumbnail = async () => {
            setLoading(true);
            setError(false);
            setThumbnail(null);

            try {
                const arrayBuffer = await file.arrayBuffer();

                const result = await mammoth.convertToHtml({
                    arrayBuffer,
                });

                if (cancelled) return;

                container = document.createElement("div");

                Object.assign(container.style, {
                    position: "fixed",
                    left: "-10000px",
                    top: "0",

                    width: "794px",
                    height: "1123px",

                    padding: "60px",

                    background: "#ffffff",
                    color: "#000000",

                    fontFamily:
                        "Arial, Helvetica, sans-serif",

                    fontSize: "16px",
                    lineHeight: "1.5",

                    boxSizing: "border-box",

                    overflow: "hidden",
                });

                container.innerHTML = result.value;

                document.body.appendChild(container);

                const canvas = await html2canvas(
                    container,
                    {
                        backgroundColor: "#ffffff",

                        width: 794,
                        height: 1123,

                        scale: 0.5,

                        logging: false,

                        useCORS: true,
                    }
                );

                if (cancelled) return;

                const thumbnailCanvas =
                    document.createElement("canvas");

                thumbnailCanvas.width = THUMBNAIL_WIDTH;
                thumbnailCanvas.height = THUMBNAIL_HEIGHT;

                const ctx =
                    thumbnailCanvas.getContext("2d");

                if (!ctx) {
                    throw new Error(
                        "Could not create canvas context"
                    );
                }

                ctx.drawImage(
                    canvas,
                    0,
                    0,
                    canvas.width,
                    canvas.height,
                    0,
                    0,
                    THUMBNAIL_WIDTH,
                    THUMBNAIL_HEIGHT
                );

                const image =
                    thumbnailCanvas.toDataURL(
                        "image/jpeg",
                        0.75
                    );

                if (!cancelled) {
                    setThumbnail(image);
                }
            } catch (error) {
                console.error(
                    "DOCX thumbnail failed:",
                    error
                );

                if (!cancelled) {
                    setError(true);
                }
            } finally {
                container?.remove();
                container = null;

                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        generateThumbnail();

        return () => {
            cancelled = true;
            container?.remove();
        };
    }, [file]);

    if (loading) {
        return (
            <div className="flex h-full w-[200px] shrink-0 items-center justify-center bg-[#ffc36d]/50 text-[12px] font-bold text-[#292929]/75">
                Generating...
            </div>
        );
    }

    if (error || !thumbnail) {
        return (
            <div className="flex h-full w-[200px] shrink-0 items-center justify-center bg-[#ffc36d]/50 text-[12px]">
                Preview unavailable
            </div>
        );
    }

    return (
        <div className="h-full w-[200px] bg-white">
            <img
                src={thumbnail}
                alt="DOCX document thumbnail"
                className="h-full w-full object-cover"
            />
        </div>
    );
}

export default ViewDocx;