
export type ActiveDriver = {
    id: string;
    name: string;
    vehicleType: "Bike" | "Auto" | "Taxi";
    joinDate: string;
    rating: number;
    totalTrips: number;
    earnings: string; // "₹12,450"
    phone: string;
    email: string;
    dob: string;
    address: string;
    experience: string;
    vehicleModel: string;
    vehicleNumber: string;
    aadhar: string;
    pan: string;
    license: string;
    rc: string;
    profile: string;
};

export const activeDrivers: ActiveDriver[] = [
    {
        id: "ACT001",
        name: "Manoj Kumar",
        vehicleType: "Bike",
        joinDate: "2023-05-12",
        rating: 4.8,
        totalTrips: 1250,
        earnings: "₹45,200",
        phone: "+91 91234 56789",
        email: "manoj.k@gmail.com",
        dob: "1994-03-22",
        address: "22, Brigade Road, Bangalore",
        experience: "3 Years",
        vehicleModel: "Hero Splendor Pro",
        vehicleNumber: "KA 01 XY 9999",
        aadhar: "/placeholder/aadhar.png",
        pan: "/placeholder/pan.png",
        license: "/placeholder/license.png",
        rc: "/placeholder/rc.png",
        profile: "/placeholder/user.png",
    },
    {
        id: "ACT002",
        name: "Deepak Sharma",
        vehicleType: "Auto",
        joinDate: "2023-06-15",
        rating: 4.5,
        totalTrips: 2100,
        earnings: "₹85,500",
        phone: "+91 88888 77777",
        email: "deepak.sharma@yahoo.com",
        dob: "1985-09-10",
        address: "10, JP Nagar 3rd Phase",
        experience: "8 Years",
        vehicleModel: "Bajaj Maxima",
        vehicleNumber: "KA 05 AB 3333",
        aadhar: "/placeholder/aadhar.png",
        pan: "/placeholder/pan.png",
        license: "/placeholder/license.png",
        rc: "/placeholder/rc.png",
        profile: "/placeholder/user.png",
    },
    {
        id: "ACT003",
        name: "Sanjay Verma",
        vehicleType: "Taxi",
        joinDate: "2023-01-20",
        rating: 4.9,
        totalTrips: 3400,
        earnings: "₹1,20,000",
        phone: "+91 76543 21098",
        email: "sanjay.verma@outlook.com",
        dob: "1992-12-05",
        address: "Flat 505, Prestige Shantiniketan",
        experience: "6 Years",
        vehicleModel: "Maruti Ertiga",
        vehicleNumber: "KA 51 Z 8888",
        aadhar: "/placeholder/aadhar.png",
        pan: "/placeholder/pan.png",
        license: "/placeholder/license.png",
        rc: "/placeholder/rc.png",
        profile: "/placeholder/user.png",
    },
    {
        id: "ACT004",
        name: "Anil Reddy",
        vehicleType: "Bike",
        joinDate: "2023-08-01",
        rating: 4.6,
        totalTrips: 800,
        earnings: "₹25,600",
        phone: "+91 99887 76655",
        email: "anil.read@gmail.com",
        dob: "1999-01-26",
        address: "56, BTM Layout 2nd Stage",
        experience: "2 Years",
        vehicleModel: "Honda Shine",
        vehicleNumber: "KA 03 MN 1111",
        aadhar: "/placeholder/aadhar.png",
        pan: "/placeholder/pan.png",
        license: "/placeholder/license.png",
        rc: "/placeholder/rc.png",
        profile: "/placeholder/user.png",
    },
    {
        id: "ACT005",
        name: "Rajesh Rao",
        vehicleType: "Taxi",
        joinDate: "2023-02-14",
        rating: 4.7,
        totalTrips: 1500,
        earnings: "₹65,000",
        phone: "+91 87654 32109",
        email: "rajesh.rao@gmail.com",
        dob: "1987-11-19",
        address: "88, Malleshwaram 8th Cross",
        experience: "12 Years",
        vehicleModel: "Toyota Innova Crysta",
        vehicleNumber: "KA 04 Q 5555",
        aadhar: "/placeholder/aadhar.png",
        pan: "/placeholder/pan.png",
        license: "/placeholder/license.png",
        rc: "/placeholder/rc.png",
        profile: "/placeholder/user.png",
    },
];
