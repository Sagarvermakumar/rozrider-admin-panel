export type Rider = {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: "active" | "blocked";
    totalTrips: number;
    walletBalance: number;
    joinedDate: string;
};

export const riders: Rider[] = [
    {
        id: "r1",
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "+1112223333",
        status: "active",
        totalTrips: 45,
        walletBalance: 120.50,
        joinedDate: "2024-01-10",
    },
    {
        id: "r2",
        name: "Bob Williams",
        email: "bob@example.com",
        phone: "+14445556666",
        status: "active",
        totalTrips: 12,
        walletBalance: 0.00,
        joinedDate: "2024-02-15",
    },
    {
        id: "r3",
        name: "Charlie Brown",
        email: "charlie@example.com",
        phone: "+17778889999",
        status: "blocked",
        totalTrips: 5,
        walletBalance: 15.00,
        joinedDate: "2024-03-01",
    },
    {
        id: "r4",
        name: "Diana Prince",
        email: "diana@example.com",
        phone: "+10001112222",
        status: "active",
        totalTrips: 88,
        walletBalance: 250.75,
        joinedDate: "2023-11-20",
    },
    {
        id: "r5",
        name: "Evan Wright",
        email: "evan@example.com",
        phone: "+12223334444",
        status: "active",
        totalTrips: 30,
        walletBalance: 50.00,
        joinedDate: "2024-01-25",
    },
];
