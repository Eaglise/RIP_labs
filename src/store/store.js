import { configureStore } from "@reduxjs/toolkit";
// import categoryReducer from "./categorySlice";
import servicesReducer from "./servicesSlice";
import serviceReducer from "./serviceSlice";
export default configureStore({
    reducer: {
        // categories: categoryReducer,
        // categoriesStatus:categoryReducer,
        // categoriesError:categoryReducer,
        services: servicesReducer,
        servicesStatus:servicesReducer,
        servicesError:servicesReducer,
        service: serviceReducer,
        serviceStatus: serviceReducer,
        serviceError: serviceReducer,
    },
});