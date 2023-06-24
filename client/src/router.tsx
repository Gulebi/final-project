import { createBrowserRouter } from "react-router-dom";
import { MainPage, ErrorPage, CategoryPage } from "./routes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/category/:categoryName",
        element: <CategoryPage />,
    },
]);

export default router;
