export const getProductImage = (image: {url: string} | null | undefined) => {
    return image ? `http://localhost:3000${image.url}` : "/placeholder.png";
};