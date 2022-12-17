import { configureStore } from "@reduxjs/toolkit";
// import categoryReducer from "./categorySlice";
import servicesReducer from "./servicesSlice";
import serviceReducer from "./serviceSlice";
import buyReducer from './buySlice'
export default configureStore({
    reducer: {
        // categories: categoryReducer,
        // categoriesStatus:categoryReducer,
        // categoriesError:categoryReducer,
        services: servicesReducer,
        servicesStatus:servicesReducer,
        servicesError:servicesReducer,
        search_input:servicesReducer,
        maxPrice:servicesReducer,
        minPrice:servicesReducer,
        maxBorder:servicesReducer,
        minBorder:servicesReducer,
        service: serviceReducer,
        serviceStatus: serviceReducer,
        serviceError: serviceReducer,
        choices:buyReducer,
        buyStatus:buyReducer,
        buyError:buyReducer,
        // amount:buyReducer,
        cart:buyReducer,
        order:buyReducer,
        oldOrder:buyReducer,
        sum:buyReducer,
        sumStatus: buyReducer,
        isUser: buyReducer,
        auth:buyReducer,
    },
});