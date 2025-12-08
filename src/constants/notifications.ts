export interface NotificationHistory {
    id: string;
    user: string;
    type: "Broadcast" | "Single User" | "System Auto";
    message: string;
    date: string;
    status: "Sent" | "Failed" | "Pending";
}

export interface AutoNotificationRule {
    id: string;
    event: string;
    message: string;
    isActive: boolean;
}

export const notificationHistory: NotificationHistory[] = [
    {
        id: "1",
        user: "All Drivers",
        type: "Broadcast",
        message: "New bonus scheme available for weekend rides!",
        date: "2024-05-10 10:00 AM",
        status: "Sent",
    },
    {
        id: "2",
        user: "John Doe (Rider)",
        type: "Single User",
        message: "Your refund has been processed.",
        date: "2024-05-09 02:30 PM",
        status: "Sent",
    },
    {
        id: "3",
        user: "System",
        type: "System Auto",
        message: "Ride #12345 Completed",
        date: "2024-05-09 01:15 PM",
        status: "Sent",
    },
    {
        id: "4",
        user: "All Customers",
        type: "Broadcast",
        message: "Update your app for new features.",
        date: "2024-05-08 09:00 AM",
        status: "Failed",
    },
    {
        id: "5",
        user: "Jane Smith (Driver)",
        type: "Single User",
        message: "Please verify your documents.",
        date: "2024-05-07 11:45 AM",
        status: "Pending",
    }
];

export const autoNotificationRules: AutoNotificationRule[] = [
    {
        id: "1",
        event: "Ride Booked",
        message: "Your ride has been booked successfully.",
        isActive: true,
    },
    {
        id: "2",
        event: "Driver Accepted",
        message: "A driver has accepted your ride and is on the way.",
        isActive: true,
    },
    {
        id: "3",
        event: "Driver Reached",
        message: "Your driver has arrived at the pickup location.",
        isActive: true,
    },
    {
        id: "4",
        event: "Ride Completed",
        message: "Thanks for riding with RozRider!",
        isActive: true,
    },
    {
        id: "5",
        event: "Wallet Recharge",
        message: "Your wallet recharge was successful.",
        isActive: true,
    },
    {
        id: "6",
        event: "Coins Earned",
        message: "You just earned coins! Keep riding to earn more.",
        isActive: true,
    },
];
