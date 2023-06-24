import { Footer, Container, Text } from "@mantine/core";

function CustomFooter() {
    return (
        <Footer height={80} p="xs">
            <Container size="xl" className="flex items-center justify-center h-full">
                <Text>© Shop 2023</Text>
            </Container>
        </Footer>
    );
}

export default CustomFooter;
