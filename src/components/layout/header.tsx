import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/layout/user-nav";
import { cn } from "@/lib/utils";

export default function Header({ className }: { className?: string }) {
    return (
        <div className={cn("border-b", className)}>
            <div className="flex h-16 items-center px-4">
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <UserNav />
                </div>
            </div>
        </div>
    );
}
