import NavBar from "@/Pages/App/components/NavBar";

export default function DashboardLayout({ children }) {

    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />
            <main className="pt-16">{children}</main>
        </div>
    );
}