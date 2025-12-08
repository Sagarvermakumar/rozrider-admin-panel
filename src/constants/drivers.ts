export type Driver = {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: "active" | "inactive" | "pending";
    rating: number;
    totalTrips: number;
    joinedDate: string;
    vehicle: string;
};

export const drivers: Driver[] = [
    {
        id: "d1",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        status: "active",
        rating: 4.8,
        totalTrips: 154,
        joinedDate: "2024-01-15",
        vehicle: "Toyota Prius (ABC-123)",
    },
    {
        id: "d2",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1987654321",
        status: "inactive",
        rating: 4.5,
        totalTrips: 89,
        joinedDate: "2024-02-20",
        vehicle: "Honda Civic (XYZ-789)",
    },
    {
        id: "d3",
        name: "Michael Brown",
        email: "michael@example.com",
        phone: "+1122334455",
        status: "pending",
        rating: 0,
        totalTrips: 0,
        joinedDate: "2024-03-10",
        vehicle: "Ford Focus (LMN-456)",
    },
    {
        id: "d4",
        name: "Emily Davis",
        email: "emily@example.com",
        phone: "+1555666777",
        status: "active",
        rating: 4.9,
        totalTrips: 342,
        joinedDate: "2023-11-05",
        vehicle: "Tesla Model 3 (TES-001)",
    },
    {
        id: "d5",
        name: "David Wilson",
        email: "david@example.com",
        phone: "+1999888777",
        status: "active",
        rating: 4.7,
        totalTrips: 210,
        joinedDate: "2023-12-12",
        vehicle: "Hyundai Elantra (HYU-555)",
    },
];



























export type DriverApplicant = {
  id: string;
  name: string;
  vehicleType: "Bike" | "Auto" | "Taxi";
  appliedDate: string;
  status: "pending" | "approved" | "rejected";

  // full details
  phone: string;
  email: string;
  address: string;
  dob: string;
  experience: string;

  vehicleModel: string;
  vehicleNumber: string;

  // KYC docs (placeholder images)
  aadhar: string;
  pan: string;
  license: string;
  rc: string;
  profile: string;
};

export const driverApplicants: DriverApplicant[] = [
  {
    id: "d1",
    name: "Rahul Sharma",
    vehicleType: "Bike",
    appliedDate: "2024-03-10",
    status: "pending",

    phone: "+91 9876543210",
    email: "rahul@example.com",
    address: "Ranchi, Jharkhand",
    dob: "1995-05-21",
    experience: "3 years",

    vehicleModel: "Honda Activa 6G",
    vehicleNumber: "JH01AB1122",

    aadhar: "/placeholder/aadhar.png",
    pan: "/placeholder/pan.png",
    license: "/placeholder/license.png",
    rc: "/placeholder/rc.png",
    profile: "/placeholder/user.png",
  },
  {
    id: "d2",
    name: "Sandeep Kumar",
    vehicleType: "Auto",
    appliedDate: "2024-03-12",
    status: "pending",

    phone: "+91 9001234567",
    email: "sandeep@example.com",
    address: "Patna, Bihar",
    dob: "1990-09-14",
    experience: "5 years",

    vehicleModel: "Bajaj RE Auto",
    vehicleNumber: "BR01CZ9876",

    aadhar: "/placeholder/aadhar.png",
    pan: "/placeholder/pan.png",
    license: "/placeholder/license.png",
    rc: "/placeholder/rc.png",
    profile: "/placeholder/user.png",
  },
  {
    id: "d3",
    name: "Suman Raj",
    vehicleType: "Taxi",
    appliedDate: "2024-03-13",
    status: "pending",

    phone: "+91 9810023344",
    email: "suman@example.com",
    address: "Delhi, India",
    dob: "1988-03-10",
    experience: "8 years",

    vehicleModel: "WagonR",
    vehicleNumber: "DL03AQ7711",

    aadhar: "/placeholder/aadhar.png",
    pan: "/placeholder/pan.png",
    license: "/placeholder/license.png",
    rc: "/placeholder/rc.png",
    profile: "/placeholder/user.png",
  },
  {
    id: "d4",
    name: "Amit Verma",
    vehicleType: "Bike",
    appliedDate: "2024-03-14",
    status: "pending",

    phone: "+91 9876500011",
    email: "amit@example.com",
    address: "Kolkata, West Bengal",
    dob: "1997-06-18",
    experience: "2 years",

    vehicleModel: "Hero Splendor",
    vehicleNumber: "WB20CD3322",

    aadhar: "/placeholder/aadhar.png",
    pan: "/placeholder/pan.png",
    license: "/placeholder/license.png",
    rc: "/placeholder/rc.png",
    profile: "/placeholder/user.png",
  },
  {
    id: "d5",
    name: "Mohit Singh",
    vehicleType: "Bike",
    appliedDate: "2024-03-09",
    status: "pending",

    phone: "+91 7999999992",
    email: "mohit@example.com",
    address: "Mumbai, Maharashtra",
    dob: "1994-01-12",
    experience: "4 years",

    vehicleModel: "TVS Raider",
    vehicleNumber: "MH01AB5421",

    aadhar: "/placeholder/aadhar.png",
    pan: "/placeholder/pan.png",
    license: "/placeholder/license.png",
    rc: "/placeholder/rc.png",
    profile: "/placeholder/user.png",
  },
];
