import { Box, Title, Rating, Button, ActionIcon, Image, Text } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { IProduct } from "../types";
import { useState } from "react";
import { formatCurrency } from "../utils";

function ProductCard({ data }: { data: IProduct }) {
    const [isInCart, setIsInCart] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    return (
        <Box className="bg-slate-200 flex flex-col gap-4 p-8 pb-4 rounded-lg h-[440px]">
            <Image src={data.image} className="p-2 bg-white rounded-lg" height={200} fit="contain" />
            <Box className="flex flex-col justify-between gap-2 h-full">
                <Box className="flex flex-col gap-2">
                    <Title order={5} lineClamp={2} h={48}>
                        {data.name}
                    </Title>
                    {data.numOfReviews === 0 ? (
                        <Text c="dimmed">No reviews</Text>
                    ) : (
                        <Box className="flex items-center gap-2">
                            <Rating defaultValue={data.rating} fractions={2} readOnly />
                            <Text fz="sm">{data.numOfReviews} reviews</Text>
                        </Box>
                    )}
                    {data.salePrice !== data.price ? (
                        <Box className="flex items-center gap-2">
                            <Text fz="lg">{formatCurrency("en-US", "USD", data.salePrice)}</Text>
                            <Text fz="xs" c="dimmed" td="line-through" className="pt-1">
                                {formatCurrency("en-US", "USD", data.price)}
                            </Text>
                        </Box>
                    ) : (
                        <Text fz="lg">{formatCurrency("en-US", "USD", data.price)}</Text>
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
                    <ActionIcon size="lg" onClick={() => setIsLiked((s) => !s)}>
                        {isLiked ? (
                            <IconHeartFilled size="1.7rem" className="text-red-500" />
                        ) : (
                            <IconHeart size="1.7rem" />
                        )}
                    </ActionIcon>
                </Box>
            </Box>
        </Box>
    );
}

export default ProductCard;
