export declare const enum REDIS_CONNECTION_STATUS {
    END = "end",
    CONNECT = "connect",
    ERROR = "error"
}
export declare const ORDER_EVENTS: {
    CREATED: string;
    PAYMENT_PENDING: string;
    CONFIRMED: string;
    SHIPPED: string;
    CANCELLED: string;
    DELIVERED: string;
};
export declare const INVENTORY_EVENTS: {
    RESERVED: string;
    STOCK_UPDATE: string;
    FAILED: string;
    RELEASED: string;
};
