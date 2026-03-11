export function sanitizeUrl(url: string): string {
    if (!url) return "#";

    // Allow local paths and Parcel/Vite bundled URLs (blobs, etc)
    if (
        url.startsWith("/") ||
        url.startsWith("./") ||
        url.startsWith("../") ||
        url.startsWith("public/") ||
        url.startsWith("blob:") ||
        url.startsWith("data:image/")
    ) {
        return url;
    }

    const allowedProtocols = ["http:", "https:"];
    try {
        const parsed = new URL(url, window.location.origin);
        return allowedProtocols.includes(parsed.protocol) ? parsed.href : "#";
    } catch {
        // If it's a relative URL or bundled asset path that doesn't start with /
        // Parcel sometimes produces URLs that URL constructor might fail on if not provided a base
        if (url.includes("javascript:")) {
            return "#";
        }
        return url;
    }
}
