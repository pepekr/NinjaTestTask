import path from "path";
import { fileTypeFromBuffer  } from "file-type";

/**
 * Detect file extension + MIME type from buffer or filename.
 *
 * @param {Buffer} buffer - File data buffer
 * @param {string} [filename] - Optional original filename (used as fallback for extension)
 * @returns {Promise<{ ext: string, mime: string }>}
 */
export async function detectFileType(buffer:ArrayBuffer | Uint8Array<ArrayBufferLike>, filename = "") {
  // Try to detect from buffer
  const type = await fileTypeFromBuffer (buffer);
  if (type) {
    return { ext: type.ext, mime: type.mime };
  }

  // Fallback: use filename extension if provided
  if (filename) {
    const ext = path.extname(filename).replace(".", "");
    if (ext) {
      // Map extension → mime (basic default)
      const mimeMap = {
        txt: "text/plain",
        json: "application/json",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        mp4: "video/mp4",
        pdf: "application/pdf"
      };
     return { ext, mime: mimeMap[ext as keyof typeof mimeMap] || "application/octet-stream" };
    }
  }

  // Ultimate fallback
  return { ext: "", mime: "application/octet-stream" };
}
