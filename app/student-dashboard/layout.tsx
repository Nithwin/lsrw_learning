import Sidebar from "@/components/student/Sidebar";


export default function StudentDashboardLayout({
    children,
}:Readonly<{children:React.ReactNode}>){
    return(
        <section>
        <Sidebar/>
        {children}
        </section>
    );
}