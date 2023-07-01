import { createBrowserRouter } from "react-router-dom";
import { MainPage, ErrorPage, CategoryPage, ProductPage, ProfilePage, AdminPage } from "./routes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/profile",
        element: <ProfilePage />,
    },
    {
        path: "/admin",
        element: <AdminPage />,
    },
    {
        path: "/category/:categoryId",
        element: <CategoryPage />,
    },
    {
        path: "/product/:productId",
        element: <ProductPage />,
    },
]);

export default router;
