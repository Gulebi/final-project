import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import apiClient from "../common/api";
import { IProduct } from "../types";
import { AppShell, Box, Container, Grid, Select, Title } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { CustomHeader, CustomFooter, ProductCard, Controls } from "../components";
import { useState } from "react";

function CategoryPage() {
    const limit = 10;
    const [page, setPage] = useState(1);
    const { categoryName } = useParams();

    const { data: categoryData } = useQuery({
        queryKey: [categoryName],
        queryFn: () => apiClient.post(`/products/byCategory`, { category: categoryName }),
        select: (data) => data.data.data as { products: IProduct[]; count: number },
    });

    return (
        <AppShell header={<CustomHeader />} footer={<CustomFooter />} className="bg-slate-50">
            <Container size="lg">
                <Box className="flex items-center justify-between px-16 mt-2">
                    <Title order={2}>{upperFirst(categoryName!)}</Title>
                    <Select
                        w={180}
                        data={[
                            "Newest",
                            "Best rating",
                            "Name: A to Z",
                            "Name: Z to A",
                            "Price: Low to High",
                            "Price: High to Low",
                        ]}
                        defaultValue={"Best rating"}
                    />
                </Box>
                {categoryData && (
                    <>
                        <Grid className="pt-4" gutter="xl">
                            {categoryData.products.map((el) => (
                                <Grid.Col lg={3} md={4} sm={6}>
                                    <ProductCard data={el} />
                                </Grid.Col>
                            ))}
                        </Grid>
                        <Controls count={categoryData.count} page={page} setPage={setPage} limit={limit} />
                    </>
                )}
            </Container>
        </AppShell>
    );
}

export default CategoryPage;
