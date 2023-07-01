import {
    Container,
    Group,
    Title,
    TextInput,
    Select,
    ActionIcon,
    Header,
    Popover,
    Text,
    Stack,
    Box,
    Indicator,
} from "@mantine/core";
import { IconSearch, IconUser, IconShoppingCart, IconX, IconHeart } from "@tabler/icons-react";
import { useState } from "react";
import { IHistoryItem, IProduct } from "../types";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../common/api";
import { useDebouncedState, useDisclosure, useLocalStorage } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";
import { AuthModal, CartDrawer } from ".";
import { modals } from "@mantine/modals";

function CustomHeader() {
    const [searchValue, setSearchValue] = useDebouncedState("", 200);
    const [currency, setCurrency] = useState<string | null>("USD");
    const [currentUserId, setCurrentUserId] = useLocalStorage({ key: "currentUserId", defaultValue: "" });
    const [searchHistory, setSearchHistory] = useLocalStorage<IHistoryItem[]>({
        key: "searchHistory",
        defaultValue: [
            { id: 1, text: "mollit" },
            { id: 2, text: "quis" },
            { id: 3, text: "ipsum" },
        ],
    });
    const [drawerOpened, { open: drawerOpen, close: drawerClose }] = useDisclosure(false);
    const navigate = useNavigate();

    const deleteFromHistory = (id: IHistoryItem["id"]) => {
        setSearchHistory((s) => s.filter((el) => el.id !== id));
    };

    const onOpenAuthModal = () => {
        modals.open({
            title: "Auth modal",
            size: "md",
            radius: "md",
            yOffset: "18vh",
            children: <AuthModal setCurrentUserId={setCurrentUserId} />,
        });
    };

    const { data: searchData } = useQuery({
        queryKey: [searchValue],
        queryFn: () => apiClient.post(`/products/search`, { search: searchValue }),
        select: (data) => data.data.data as IProduct[],
        enabled: !!searchValue,
    });

    return (
        <>
            <CartDrawer opened={drawerOpened} close={drawerClose} />
            <Header height={80} p="xs">
                <Container size="xl" className="flex items-center justify-between h-full">
                    <Group className="gap-10">
                        <Link to="/" className="text-black no-underline">
                            <Title>Shop</Title>
                        </Link>
                        <Popover width="target" position="bottom" radius="md">
                            <Popover.Target>
                                <TextInput
                                    icon={<IconSearch size="1.4rem" />}
                                    placeholder="Search"
                                    radius="md"
                                    w={400}
                                    defaultValue={searchValue}
                                    onChange={(event) => setSearchValue(event.currentTarget.value)}
                                />
                            </Popover.Target>
                            <Popover.Dropdown className="p-4">
                                {searchValue && (
                                    <>
                                        <Title order={4} className="mb-2">
                                            Search results
                                        </Title>
                                        <Stack spacing="none" className="gap-2 mb-2">
                                            {searchData?.length === 0 ? (
                                                <Text>No results</Text>
                                            ) : (
                                                searchData?.map((el) => (
                                                    <Box>
                                                        <Link
                                                            to={`/product/${el._id}`}
                                                            className="text-black no-underline"
                                                        >
                                                            <Text>{el.name}</Text>
                                                        </Link>
                                                    </Box>
                                                ))
                                            )}
                                        </Stack>
                                    </>
                                )}
                                <Title order={4} className="mb-2">
                                    Search history
                                </Title>
                                {history.length ? (
                                    <Stack spacing="none">
                                        {searchHistory.map((el) => (
                                            <Box
                                                key={el.id}
                                                className="cursor-pointer flex justify-between items-center"
                                            >
                                                <Text>{el.text}</Text>
                                                <ActionIcon onClick={() => deleteFromHistory(el.id)}>
                                                    <IconX color="#000000" />
                                                </ActionIcon>
                                            </Box>
                                        ))}
                                    </Stack>
                                ) : (
                                    <Text>Empty</Text>
                                )}
                            </Popover.Dropdown>
                        </Popover>
                    </Group>
                    <Group>
                        <Select
                            radius="md"
                            data={["KZT", "RUB", "USD"]}
                            value={currency}
                            onChange={setCurrency}
                            w={80}
                        />
                        <ActionIcon size="lg">
                            <Indicator inline label="1" size={16} offset={2} disabled={!currentUserId}>
                                <IconHeart size="1.5rem" />
                            </Indicator>
                        </ActionIcon>
                        <ActionIcon
                            size="lg"
                            onClick={() => (currentUserId ? navigate("/profile") : onOpenAuthModal())}
                        >
                            <Indicator inline label="1" size={16} offset={2} disabled={!currentUserId}>
                                <IconUser size="1.5rem" />
                            </Indicator>
                        </ActionIcon>
                        <ActionIcon size="lg" onClick={drawerOpen}>
                            <Indicator inline label="1" size={16} offset={2}>
                                <IconShoppingCart size="1.5rem" />
                            </Indicator>
                        </ActionIcon>
                    </Group>
                </Container>
            </Header>
        </>
    );
}

export default CustomHeader;
