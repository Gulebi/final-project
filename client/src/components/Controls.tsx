import { Container, Pagination } from "@mantine/core";

interface ControlsProps {
    count: number;
    limit: number;
    page: number;
    setPage: (value: number) => void;
}

function Controls({ count, limit, page, setPage }: ControlsProps) {
    return (
        <Container size="xs" className="flex items-center justify-center mt-4">
            <Pagination total={Math.ceil(count / limit)} value={page} onChange={setPage} />
        </Container>
    );
}

export default Controls;
