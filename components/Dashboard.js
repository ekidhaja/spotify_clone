import Body from "./Body";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    return (
        <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
            <Sidebar />
            <Body />
        </main>
    );
}
 
export default Dashboard;