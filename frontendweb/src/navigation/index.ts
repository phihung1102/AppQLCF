import { useNavigate } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";

export const ROUTES = {
    MENU: "/",
    CART: "/cart",
    ORDER: "/order",
};

export const useNavigation = () => {
    const navigate: NavigateFunction = useNavigate();

    const gotoMenu = () => navigate(ROUTES.MENU);
    const gotoCart = (params?: {table_number?: number}) => {
        if (params?.table_number) {
            navigate(`${ROUTES.CART}?table_number=${params.table_number}`);
        } else {
            navigate(ROUTES.CART);
        }
    };
    const gotoOrder = (params?: { table_number?: number }) => {
        if (params?.table_number) {
            navigate(`${ROUTES.ORDER}?table_number=${params.table_number}`);
        } else {
            navigate(ROUTES.ORDER);
        }
    };

    return { gotoCart, gotoMenu, gotoOrder };
};