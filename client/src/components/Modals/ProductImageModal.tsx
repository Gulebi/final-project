import { Image } from "@mantine/core";

function ProductImageModal({ imageUrl }: { imageUrl: string }) {
    return <Image src={imageUrl} className="p-2 bg-white rounded-lg" height={400} fit="contain" />;
}

export default ProductImageModal;
