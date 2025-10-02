export const getProductImage = ( image?: { url: string } | string | null ) => {
    if (!image) return "/placeholder.png";

    if (typeof image === "string") { return `http://localhost:3000${image}`; }

    return `http://localhost:3000${image.url}`;
}