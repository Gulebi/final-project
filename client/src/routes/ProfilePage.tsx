import { AppShell, Container, Text } from "@mantine/core";
import { CustomHeader, CustomFooter, AuthModal } from "../components";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../common/api";
import { IUser } from "../types";
import { match } from "ts-pattern";
import { useEffect } from "react";
import { modals } from "@mantine/modals";

function ProfilePage() {
    const [currentUserId, setCurrentUserId] = useLocalStorage({ key: "currentUserId", defaultValue: "" });

    const onOpenAuthModal = () => {
        modals.open({
            title: "Auth modal",
            size: "md",
            radius: "md",
            yOffset: "18vh",
            children: <AuthModal setCurrentUserId={setCurrentUserId} />,
        });
    };

    // useEffect(() => {
    //     if (!currentUserId) onOpenAuthModal();
    // }, [currentUserId]);

    const { data: userData, status } = useQuery({
        queryKey: [currentUserId],
        queryFn: () => apiClient.get(`/users/byId/${currentUserId}`),
        select: (data) => data.data.data as IUser,
        enabled: !!currentUserId,
    });

    return (
        <AppShell header={<CustomHeader />} footer={<CustomFooter />} className="bg-slate-50">
            <Container size="lg">
                {match(status)
                    .with("success", () => <Text>{userData?.name}</Text>)
                    .otherwise(() => (
                        <Text>sus</Text>
                    ))}
            </Container>
        </AppShell>
    );
}

export default ProfilePage;
