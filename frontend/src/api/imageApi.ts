import api from "./api";

export const ImageApi = {
    getImage: (productId: number) => api.get(`/image/${productId}`),
    
    create: async (productId: number, uri: string) => {
        const formData = new FormData();
        const filename = uri.split("/").pop();
        const type = `image/${filename?.split(".").pop()}`;

        formData.append("image", { uri, name: filename, type } as any);
        formData.append("productId", productId.toString());

        return api.post("/image", formData, {
            headers: { "Content-Type": "multipart/form-data" },  // override json
        });
    },
    
    remove: (id: number) => api.delete(`/image/${id}`),
}