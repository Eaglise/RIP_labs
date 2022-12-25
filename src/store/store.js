import { configureStore } from "@reduxjs/toolkit";
// import categoryReducer from "./categorySlice";
import servicesReducer from "./servicesSlice";
import serviceReducer from "./serviceSlice";
import buyReducer from './buySlice'
import managerReducer from './managerSlice';
export default configureStore({
    reducer: {

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
        curr_choices:buyReducer,
        buyStatus:buyReducer,
        buyError:buyReducer,
        // amount:buyReducer,
        cart:buyReducer,
        order:buyReducer,
        oldOrder:buyReducer,
        oldOrders:buyReducer,
        sum:buyReducer,
        sumStatus: buyReducer,
        isUser: buyReducer,
        auth:buyReducer,
        user_comment:buyReducer,

        categories:managerReducer,
        users:managerReducer,
        statusList:managerReducer,
        pickedStatus:managerReducer,
        pickedStart:managerReducer,
        pickedEnd: managerReducer,
        pickedUser:managerReducer,

        isManager:managerReducer,
    },
});