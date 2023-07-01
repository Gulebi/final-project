import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import apiClient from "../common/api";
import { IProduct } from "../types";
import { AppShell, Box, Container, Grid, Select, Title, Tooltip } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { CustomHeader, CustomFooter, ProductCard, Controls } from "../components";
import { useState } from "react";

interface SortStatus {
    field: string;
    dir: "asc" | "desc";
}

const sortStatuses: Record<string, SortStatus> = {
    popular: { field: "numOfReviews", dir: "desc" },
    bestRating: { field: "rating", dir: "desc" },
    nameAToZ: { field: "name", dir: "asc" },
    nameZToA: { field: "name", dir: "desc" },
    priceLowToHigh: { field: "priceData.price", dir: "asc" },
    priceHighToLow: { field: "priceData.price", dir: "desc" },
};

function CategoryPage() {
    const [sortStatus, setSortStatus] = useState<string | null>("bestRating");
    const [productsOnPage, setProductsOnPage] = useState<string | null>("8");
    const [page, setPage] = useState(1);
    const { categoryId } = useParams();

    const { data: productsData } = useQuery({
        queryKey: [categoryId, page, productsOnPage, sortStatuses, sortStatus],
        queryFn: () => {
            const { field, dir } = sortStatuses[sortStatus!];
            return apiClient.get(
                `/products/byCategoryId/${categoryId}?page=${page}&limit=${productsOnPage}&sortField=${field}&dir=${dir}`
            );
        },
        select: (data) => data.data.data as { products: IProduct[]; count: number },
    });

    return (
        <AppShell header={<CustomHeader />} footer={<CustomFooter />} className="bg-slate-50">
            <Container size="lg">
                <Box className="flex items-center justify-between px-16 mt-2">
                    <Title order={2} onClick={() => setPage(1)} className="cursor-pointer">
                        {upperFirst(productsData?.products[0]?.category.name || "")}
                    </Title>
                    <Box className="flex gap-6">
                        <Tooltip label="Sort by">
                            <Select
                                w={180}
                                data={[
                                    { label: "Popular", value: "popular" },
                                    { label: "Best rating", value: "bestRating" },
                                    { label: "Name: A to Z", value: "nameAToZ" },
                                    { label: "Name: Z to A", value: "nameZToA" },
                                    { label: "Price: Low to High", value: "priceLowToHigh" },
                                    { label: "Price: High to Low", value: "priceHighToLow" },
                                ]}
                                value={sortStatus}
                                onChange={setSortStatus}
                            />
                        </Tooltip>
                        <Tooltip label="Products on page">
                            <Select
                                w={70}
                                data={["4", "8", "12", "16"]}
                                value={productsOnPage}
                                onChange={setProductsOnPage}
                            />
                        </Tooltip>
                    </Box>
                </Box>
                {productsData && productsData.count !== 0 ? (
                    <>
                        <Grid className="pt-4" gutter="xl">
                            {productsData.products.map((el) => (
                                <Grid.Col lg={3} md={4} sm={6}>
                                    <ProductCard data={el} />
                                </Grid.Col>
                            ))}
                        </Grid>
                        <Controls
                            count={productsData.count}
                            page={page}
                            setPage={setPage}
                            limit={Number(productsOnPage)}
                        />
                    </>
                ) : (
                    <Box className="flex justify-center pt-8">
                        <Title order={2}>No products</Title>
                    </Box>
                )}
            </Container>
        </AppShell>
    );
}

export default CategoryPage;
