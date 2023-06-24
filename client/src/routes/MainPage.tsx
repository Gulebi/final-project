import { upperFirst } from "@mantine/hooks";
import { AppShell, Container, Grid, Title, Text, Image, Box } from "@mantine/core";

import { Link } from "react-router-dom";
import { CustomFooter, CustomHeader } from "../components";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../common/api";

function MainPage() {
    const { data: categories } = useQuery({
        queryKey: [],
        queryFn: () => apiClient.get(`/products/categories`),
        select: (data) => data.data.data as { name: string }[],
    });

    return (
        <AppShell header={<CustomHeader />} footer={<CustomFooter />} className="bg-slate-50">
            <Container size="lg">
                <Title order={2} align="center" className="mt-2">
                    Categories
                </Title>
                <Grid className="pt-4">
                    {categories &&
                        categories.map((c) => (
                            <Grid.Col span={3}>
                                <Link
                                    to={"/category/" + encodeURIComponent(c.name)}
                                    className="text-black no-underline"
                                >
                                    <Box className="bg-slate-200 flex flex-col items-center gap-4 p-8 pb-4 rounded-lg">
                                        <Image src={null} radius="md" height={150} withPlaceholder />
                                        <Text className="text-lg">{upperFirst(c.name)}</Text>
                                    </Box>
                                </Link>
                            </Grid.Col>
                        ))}
                </Grid>
            </Container>
        </AppShell>
    );
}

export default MainPage;
