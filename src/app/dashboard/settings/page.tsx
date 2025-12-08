import { SettingsForm } from "@/components/forms/settings-form";

export default function SettingsPage() {
    return (
        <div className="flex-1 space-y-4 p-1 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">App Settings</h2>
            </div>
            <div className="max-w-2xl">
                <SettingsForm />
            </div>
        </div>
    );
}
