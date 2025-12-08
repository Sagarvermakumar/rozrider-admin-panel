export type Customer = {
    id: string;
    name: string;
    email: string;
    phone: string;
    totalTrips: number;
    walletBalance: number;
    status: "active" | "inactive" | "blocked";
    joinedDate: string;
    address: string;
    recentTrips: {
        id: string;
        date: string;
        amount: number;
        destination: string;
    }[];
};

export const customers: Customer[] = [
    {
        id: "c1",
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "+1112223333",
        totalTrips: 45,
        walletBalance: 120.50,
        status: "active",
        joinedDate: "2024-01-10",
        address: "123 Elm St, New York, NY",
        recentTrips: [
            { id: "t101", date: "2024-03-20", amount: 25.00, destination: "JFK Airport" },
            { id: "t102", date: "2024-03-18", amount: 15.00, destination: "Times Square" }
        ]
    },
    {
        id: "c2",
        name: "Bob Williams",
        email: "bob@example.com",
        phone: "+14445556666",
        totalTrips: 12,
        walletBalance: 0.00,
        status: "inactive",
        joinedDate: "2024-02-15",
        address: "456 Oak Ave, Brooklyn, NY",
        recentTrips: []
    },
    {
        id: "c3",
        name: "Charlie Brown",
        email: "charlie@example.com",
        phone: "+17778889999",
        totalTrips: 5,
        walletBalance: 15.00,
        status: "blocked",
        joinedDate: "2024-03-01",
        address: "789 Pine Ln, Queens, NY",
        recentTrips: [
            { id: "t201", date: "2024-03-10", amount: 40.00, destination: "Central Park" }
        ]
    },
    {
        id: "c4",
        name: "Diana Prince",
        email: "diana@example.com",
        phone: "+10001112222",
        totalTrips: 88,
        walletBalance: 250.75,
        status: "active",
        joinedDate: "2023-11-20",
        address: "101 Maple Rd, Bronx, NY",
        recentTrips: [
            { id: "t301", date: "2024-03-21", amount: 30.00, destination: "Wall St" }
        ]
    },
    {
        id: "c5",
        name: "Evan Wright",
        email: "evan@example.com",
        phone: "+12223334444",
        totalTrips: 30,
        walletBalance: 50.00,
        status: "active",
        joinedDate: "2024-01-25",
        address: "202 Birch Dr, Staten Island, NY",
        recentTrips: []
    },
];
