import { Anchor, Box, Button, Checkbox, Group, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { match } from "ts-pattern";
import apiClient from "../../common/api";
import { modals } from "@mantine/modals";

function AuthModal({ setCurrentUserId }: { setCurrentUserId: (newValue: string) => void }) {
    const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

    const loginForm = useForm({
        initialValues: {
            email: "",
            password: "",
            remember: false,
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) => (val.length < 8 ? "Password should include at least 8 characters" : null),
        },
    });

    const onLoginFormSubmit = async (values: typeof loginForm.values) => {
        const res = await apiClient.post("/auth/login", { email: values.email, password: values.password });

        if (res.data.message === "Success") {
            setCurrentUserId(res.data.data);
            modals.closeAll();
        }
    };

    const signupForm = useForm({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) => (val.length < 8 ? "Password should include at least 8 characters" : null),
        },
    });

    const onSignupFormSubmit = async (values: typeof signupForm.values) => {
        const res = await apiClient.post("/auth/signup", values);

        if (res.data.message === "Success") {
            setCurrentUserId(res.data.data);
            modals.closeAll();
        }
    };

    return (
        <Box className="p-2">
            {match(isLoginForm)
                .with(true, () => (
                    <>
                        <Title order={3} ta="center">
                            Log in
                        </Title>
                        <form onSubmit={loginForm.onSubmit((values) => onLoginFormSubmit(values))}>
                            <Stack>
                                <TextInput
                                    required
                                    label="Email"
                                    placeholder="Your email"
                                    {...loginForm.getInputProps("email")}
                                />
                                <PasswordInput
                                    required
                                    label="Password"
                                    placeholder="Your password"
                                    {...loginForm.getInputProps("password")}
                                />
                                <Checkbox label="Remember me" {...loginForm.getInputProps("remember")} />
                            </Stack>
                            <Group position="apart" mt="xl">
                                <Anchor
                                    component="button"
                                    type="button"
                                    color="dimmed"
                                    size="xs"
                                    onClick={() => setIsLoginForm((s) => !s)}
                                >
                                    Don't have an account? Sign up
                                </Anchor>
                                <Button type="submit" radius="xl">
                                    Log in
                                </Button>
                            </Group>
                        </form>
                    </>
                ))
                .with(false, () => (
                    <>
                        <Title order={3} ta="center">
                            Sign up
                        </Title>
                        <form onSubmit={signupForm.onSubmit((values) => onSignupFormSubmit(values))}>
                            <Stack>
                                <TextInput
                                    required
                                    label="Name"
                                    placeholder="Your name"
                                    {...signupForm.getInputProps("name")}
                                />
                                <TextInput
                                    required
                                    label="Email"
                                    placeholder="Your email"
                                    {...signupForm.getInputProps("email")}
                                />
                                <PasswordInput
                                    required
                                    label="Password"
                                    placeholder="Your password"
                                    {...signupForm.getInputProps("password")}
                                />
                            </Stack>
                            <Group position="apart" mt="xl">
                                <Anchor
                                    component="button"
                                    type="button"
                                    color="dimmed"
                                    onClick={() => setIsLoginForm((s) => !s)}
                                    size="xs"
                                >
                                    Already have an account? Log in
                                </Anchor>
                                <Button type="submit" radius="xl">
                                    Sign up
                                </Button>
                            </Group>
                        </form>
                    </>
                ))
                .exhaustive()}
        </Box>
    );
}

export default AuthModal;
