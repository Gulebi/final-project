import {
    AppShell,
    Box,
    Container,
    Grid,
    Header,
    NumberInput,
    Select,
    TextInput,
    Textarea,
    Title,
    Button,
    SimpleGrid,
    Divider,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../common/api";
import { ICategory } from "../types";
import { useForm } from "@mantine/form";

function AdminPage() {
    const { data: categories } = useQuery({
        queryKey: [],
        queryFn: () => apiClient.get(`/categories`),
        select: (data) => data.data.data as ICategory[],
    });

    const form = useForm({
        initialValues: {
            name: "",
            imageURL: "",
            description: "",
            manufacturer: "",
            category: {
                _id: "",
                name: "",
            },
            quantity: 0,
            price: 0,
            discount: 0,
            originalPrice: 0,
            currency: "",
        },
    });

    return (
        <AppShell
            header={
                <Header height={80} p="xs">
                    <Container size="xl" className="flex items-center justify-center h-full">
                        <Title order={2}>Admin page</Title>
                    </Container>
                </Header>
            }
            className="bg-slate-50"
        >
            <Container size="lg" p="lg">
                <Grid gutter="lg">
                    <Grid.Col span={5}>
                        <Box className="flex flex-col gap-1 items-center bg-white py-6 px-10 shadow-md rounded-lg">
                            <Title order={3}>Add product</Title>
                            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                                <Box className="flex flex-col gap-3 w-full">
                                    <TextInput
                                        placeholder="Name"
                                        label="Name"
                                        required
                                        {...form.getInputProps("name")}
                                    />
                                    <TextInput
                                        placeholder="Image URL"
                                        label="Image URL"
                                        required
                                        {...form.getInputProps("imageURL")}
                                    />
                                    <Textarea
                                        placeholder="Description"
                                        label="Description"
                                        minRows={3}
                                        required
                                        {...form.getInputProps("description")}
                                    />
                                    <TextInput placeholder="Manufacturer" label="Manufacturer" required />
                                    <SimpleGrid cols={2}>
                                        <Select
                                            label="Category"
                                            placeholder="Category"
                                            data={categories?.map((c) => c.name) || []}
                                            required
                                        />
                                        <NumberInput
                                            label="Quantity"
                                            placeholder="Quantity"
                                            min={0}
                                            required
                                            {...form.getInputProps("quantity")}
                                        />
                                    </SimpleGrid>
                                    <Divider />
                                    <SimpleGrid cols={2}>
                                        <NumberInput
                                            label="Original price"
                                            placeholder="Original price"
                                            min={0}
                                            precision={2}
                                            required
                                            {...form.getInputProps("originalPrice")}
                                        />
                                        <NumberInput
                                            label="Discount"
                                            placeholder="Discount"
                                            min={0}
                                            max={100}
                                            required
                                            {...form.getInputProps("discount")}
                                        />
                                        <NumberInput
                                            label="Price"
                                            placeholder="Price"
                                            min={0}
                                            precision={2}
                                            hideControls
                                            className="pointer-events-none"
                                        />
                                        <Select
                                            label="Currency"
                                            placeholder="Currency"
                                            data={["KZT", "RUB", "USD"]}
                                            required
                                            {...form.getInputProps("currency")}
                                        />
                                    </SimpleGrid>
                                    <Button mt="lg" type="submit">
                                        Add product
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <Box className="flex flex-col gap-1 items-center bg-white py-6 px-10 shadow-md rounded-lg">
                            <Title order={3}>Products</Title>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Container>
        </AppShell>
    );
}

export default AdminPage;
