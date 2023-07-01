import { Box, Title, Button, ActionIcon, Image, Text, Indicator } from "@mantine/core";
import { IconHeart, IconHeartFilled, IconScale, IconStarFilled } from "@tabler/icons-react";
import { IProduct } from "../types";
import { useState } from "react";
import { formatCurrency } from "../utils";
import { Link } from "react-router-dom";
import { modals } from "@mantine/modals";
import { ProductImageModal } from ".";

function ProductCard({ data }: { data: IProduct }) {
    const [isInCart, setIsInCart] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const onOpenImageModal = () => {
        modals.open({
            size: "lg",
            radius: "md",
            yOffset: "18vh",
            closeButtonProps: { size: "md" },
            children: <ProductImageModal imageUrl={data.imageUrl} />,
        });
    };

    return (
        <Box className="bg-slate-200 flex flex-col gap-4 p-8 pb-4 rounded-lg ">
            <Indicator
                inline
                label={`-${data.priceData.discount}%`}
                size={24}
                disabled={!data.priceData.discount}
                zIndex={1}
            >
                <Image
                    src={data.imageUrl}
                    className="p-2 bg-white rounded-lg cursor-zoom-in"
                    height={200}
                    fit="contain"
                    onClick={onOpenImageModal}
                />
            </Indicator>
            <Box className="flex flex-col justify-between gap-2 h-full">
                <Box className="flex flex-col gap-2">
                    <Link to={`/product/${data._id}`} className="text-black no-underline">
                        <Title order={5} lineClamp={2} h={48}>
                            {data.name}
                        </Title>
                    </Link>
                    {data.numOfReviews === 0 ? (
                        <Text c="dimmed">No reviews</Text>
                    ) : (
                        <Box className="flex items-center gap-2">
                            <Box className="flex gap-1">
                                {[...Array(5)].map((_s, i) => {
                                    if (i + 1 <= Math.ceil(data.rating)) {
                                        return <IconStarFilled className="text-yellow-500" size={"1.2rem"} />;
                                    } else {
                                        return <IconStarFilled className="text-gray-300" size={"1.2rem"} />;
                                    }
                                })}
                            </Box>
                            <Text fz="sm">{data.numOfReviews} reviews</Text>
                        </Box>
                    )}
                    {data.priceData.discount ? (
                        <Box className="flex items-center gap-2">
                            <Text fz="lg">{formatCurrency("en-US", "USD", data.priceData.price)}</Text>
                            <Text fz="xs" c="dimmed" td="line-through" className="pt-1">
                                {formatCurrency("en-US", "USD", data.priceData.originalPrice)}
                            </Text>
                        </Box>
                    ) : (
                        <Text fz="lg">{formatCurrency("en-US", "USD", data.priceData.price)}</Text>
                    )}
                </Box>
                <Box className="flex items-center justify-between">
                    <Button
                        variant={isInCart ? "outline" : "filled"}
                        onClick={() => setIsInCart((s) => !s)}
                        className="w-28"
                    >
                        {isInCart ? "In cart" : "Add to cart"}
                    </Button>
                    <Box className="flex items-center gap-1">
                        <ActionIcon size="lg" onClick={() => setIsLiked((s) => !s)}>
                            {isLiked ? (
                                <IconHeartFilled size="1.7rem" className="text-red-500" />
                            ) : (
                                <IconHeart size="1.7rem" />
                            )}
                        </ActionIcon>
                        <ActionIcon size="lg">
                            <IconScale size="1.7rem" />
                        </ActionIcon>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default ProductCard;
