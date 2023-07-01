import { AppShell, Container, Title, Image, Grid, Box, Text, Button, ActionIcon, Indicator } from "@mantine/core";
import { CustomHeader, CustomFooter } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../common/api";
import { IProduct } from "../types";
import { IconArrowLeft, IconHeart, IconHeartFilled, IconScale, IconStarFilled } from "@tabler/icons-react";
import { formatCurrency } from "../utils";
import { useState } from "react";

function ProductPage() {
    const [isInCart, setIsInCart] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const { productId } = useParams();
    const navigate = useNavigate();

    const { data: productData } = useQuery({
        queryKey: [productId],
        queryFn: () => apiClient.get(`/products/byId/${productId}`),
        select: (data) => data.data.data as IProduct,
    });

    return (
        <AppShell header={<CustomHeader />} footer={<CustomFooter />} className="bg-slate-50">
            <Container size="lg" p="lg">
                {productData && (
                    <Grid gutter="xl" p="md" className="bg-slate-200 rounded-xl">
                        <Grid.Col span={5}>
                            <Indicator
                                inline
                                label={<Text fz="md" className="mx-1">{`-${productData.priceData.discount}%`}</Text>}
                                size={32}
                                disabled={!productData.priceData.discount}
                                zIndex={1}
                                offset={2}
                            >
                                <Image src={productData.imageUrl} radius="md" />
                            </Indicator>
                        </Grid.Col>
                        <Grid.Col span={7}>
                            <Box className="flex flex-col py-6 justify-between h-full items-start">
                                <Box className="flex flex-col gap-2">
                                    <Box className="flex flex-col gap-1">
                                        <Title order={2}>{productData.name}</Title>
                                        <Text fz="lg">{productData.description}</Text>
                                        <Text>{productData.category.name}</Text>
                                    </Box>
                                    {productData.numOfReviews === 0 ? (
                                        <Text c="dimmed">No reviews</Text>
                                    ) : (
                                        <Box className="flex items-center gap-3">
                                            <Box className="flex gap-1.5">
                                                {[...Array(5)].map((_s, i) => {
                                                    if (i + 1 <= Math.ceil(productData.rating)) {
                                                        return (
                                                            <IconStarFilled
                                                                className="text-yellow-500"
                                                                size={"1.5rem"}
                                                            />
                                                        );
                                                    } else {
                                                        return (
                                                            <IconStarFilled className="text-gray-300" size={"1.5rem"} />
                                                        );
                                                    }
                                                })}
                                            </Box>
                                            <Text fz="md">{productData.numOfReviews} reviews</Text>
                                        </Box>
                                    )}
                                    {productData.priceData.discount ? (
                                        <Box className="flex items-center gap-2">
                                            <Title order={2}>
                                                {formatCurrency(
                                                    "en-US",
                                                    productData.priceData.currency,
                                                    productData.priceData.price
                                                )}
                                            </Title>
                                            <Text fz="md" c="dimmed" td="line-through" className="pt-1.5">
                                                {formatCurrency(
                                                    "en-US",
                                                    productData.priceData.currency,
                                                    productData.priceData.originalPrice
                                                )}
                                            </Text>
                                        </Box>
                                    ) : (
                                        <Title order={2}>
                                            {formatCurrency(
                                                "en-US",
                                                productData.priceData.currency,
                                                productData.priceData.price
                                            )}
                                        </Title>
                                    )}
                                    <Box className="flex items-center gap-4 mt-2">
                                        {productData.quantity ? (
                                            <Button
                                                size="md"
                                                variant={isInCart ? "outline" : "filled"}
                                                onClick={() => setIsInCart((s) => !s)}
                                                className="w-32"
                                            >
                                                {isInCart ? "In cart" : "Add to cart"}
                                            </Button>
                                        ) : (
                                            <Button disabled className="w-32">
                                                Out of stock
                                            </Button>
                                        )}
                                        <Box className="flex items-center gap-2">
                                            <ActionIcon size="lg" onClick={() => setIsLiked((s) => !s)}>
                                                {isLiked ? (
                                                    <IconHeartFilled size="2rem" className="text-red-500" />
                                                ) : (
                                                    <IconHeart size="2rem" />
                                                )}
                                            </ActionIcon>
                                            <ActionIcon size="lg">
                                                <IconScale size="2rem" />
                                            </ActionIcon>
                                        </Box>
                                    </Box>
                                </Box>
                                <Button variant="subtle" leftIcon={<IconArrowLeft />} onClick={() => navigate(-1)}>
                                    Go back
                                </Button>
                            </Box>
                        </Grid.Col>
                    </Grid>
                )}
            </Container>
        </AppShell>
    );
}

export default ProductPage;
