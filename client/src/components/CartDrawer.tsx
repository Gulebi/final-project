import { Drawer } from "@mantine/core";

function CartDrawer({ opened, close }: { opened: boolean; close: () => void }) {
    return <Drawer opened={opened} onClose={close} title="Cart" size={400} position="right"></Drawer>;
}

export default CartDrawer;
