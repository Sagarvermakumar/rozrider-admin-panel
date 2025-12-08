import { DollarSign, CreditCard, Clock } from "lucide-react";
export const earningsData = [
    { name: "Jan", total: 2000 },
    { name: "Feb", total: 3500 },
    { name: "Mar", total: 4200 },
    { name: "Apr", total: 3800 },
    { name: "May", total: 5000 },
    { name: "Jun", total: 6000 },
    { name: "Jul", total: 5500 },
    { name: "Aug", total: 7000 },
    { name: "Sep", total: 6800 },
    { name: "Oct", total: 8000 },
    { name: "Nov", total: 7500 },
    { name: "Dec", total: 9000 },
];

export const payoutHistory = [
    { id: "p1", driver: "John Doe", amount: 500, date: "2024-03-10", status: "Paid" },
    { id: "p2", driver: "Jane Smith", amount: 350, date: "2024-03-11", status: "Processing" },
    { id: "p3", driver: "Emily Davis", amount: 1200, date: "2024-03-12", status: "Paid" },
    { id: "p4", driver: "David Sink", amount: 800, date: "2024-03-13", status: "Paid" },
    { id: "p4", driver: "David Lues", amount: 800, date: "2024-03-13", status: "Paid" },
    { id: "p4", driver: "Luckey Lues", amount: 800, date: "2024-03-13", status: "Processing" },
    { id: "p4", driver: "Villium Wilson", amount: 800, date: "2024-03-13", status: "Paid" },
    { id: "p4", driver: "Kartik aaryan", amount: 800, date: "2024-03-13", status: "Failed" },
    { id: "p4", driver: "Abhishek Sharma", amount: 800, date: "2024-03-13", status: "Processing" },
];





export const statsCards = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    desc: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    title: "Completed Payouts",
    value: "1,245",
    desc: "Processed this month",
    icon: CreditCard,
  },
  {
    title: "Pending Payouts",
    value: "42",
    desc: "Awaiting approval",
    icon: Clock,
  },
];
