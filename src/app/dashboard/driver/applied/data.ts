
export type AppliedDriver = {
    id: string;
    name: string;
    vehicleType: "Bike" | "Auto" | "Taxi";
    appliedDate: string;
    status: "pending";
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

export const appliedDrivers: AppliedDriver[] = [
    {
        id: "APP001",
        name: "Rahul Kumar",
        vehicleType: "Bike",
        appliedDate: "2024-01-15",
        status: "pending",
        phone: "+91 98765 43210",
        email: "rahul.k@gmail.com",
        dob: "1995-08-12",
        address: "123, MG Road, Indiranagar, Bangalore",
        experience: "2 Years",
        vehicleModel: "Hero Splendor Plus",
        vehicleNumber: "KA 01 AB 1234",
        aadhar: "/placeholder/aadhar.png",
        pan: "/placeholder/pan.png",
        license: "/placeholder/license.png",
        rc: "/placeholder/rc.png",
        profile: "/placeholder/user.png",
    },
    {
        id: "APP002",
        name: "Suresh Singh",
        vehicleType: "Auto",
        appliedDate: "2024-01-16",
        status: "pending",
        phone: "+91 98989 89898",
        email: "suresh.singh@yahoo.com",
        dob: "1988-05-20",
        address: "45, 2nd Cross, Jayanagar, Bangalore",
        experience: "5 Years",
        vehicleModel: "Bajaj RE",
        vehicleNumber: "KA 05 MN 5678",
        aadhar: "/placeholder/aadhar.png",
        pan: "/placeholder/pan.png",
        license: "/placeholder/license.png",
        rc: "/placeholder/rc.png",
        profile: "/placeholder/user.png",
    },
    {
        id: "APP003",
        name: "Vikram Malhotra",
        vehicleType: "Taxi",
        appliedDate: "2024-01-18",
        status: "pending",
        phone: "+91 77777 66666",
        email: "vikram.m@outlook.com",
        dob: "1990-11-30",
        address: "Flat 102, Sunshine Apts, Whitefield",
        experience: "4 Years",
        vehicleModel: "Maruti Swift Dzire",
        vehicleNumber: "KA 53 XY 9012",
        aadhar: "/placeholder/aadhar.png",
        pan: "/placeholder/pan.png",
        license: "/placeholder/license.png",
        rc: "/placeholder/rc.png",
        profile: "/placeholder/user.png",
    },
    {
        id: "APP004",
        name: "Amit Patel",
        vehicleType: "Bike",
        appliedDate: "2024-01-19",
        status: "pending",
        phone: "+91 66666 55555",
        email: "amit.wrk@gmail.com",
        dob: "1998-02-14",
        address: "89, HSR Layout, Sector 2",
        experience: "1 Year",
        vehicleModel: "Honda Activa 6G",
        vehicleNumber: "KA 03 JK 3456",
        aadhar: "/placeholder/aadhar.png",
        pan: "/placeholder/pan.png",
        license: "/placeholder/license.png",
        rc: "/placeholder/rc.png",
        profile: "/placeholder/user.png",
    },
    {
        id: "APP005",
        name: "Ramesh Gupta",
        vehicleType: "Taxi",
        appliedDate: "2024-01-20",
        status: "pending",
        phone: "+91 99999 00000",
        email: "ramesh.g@gmail.com",
        dob: "1985-07-07",
        address: "7, Koramangala 4th Block",
        experience: "10 Years",
        vehicleModel: "Toyota Etios",
        vehicleNumber: "KA 01 CD 7890",
        aadhar: "/placeholder/aadhar.png",
        pan: "/placeholder/pan.png",
        license: "/placeholder/license.png",
        rc: "/placeholder/rc.png",
        profile: "/placeholder/user.png",
    },
];
