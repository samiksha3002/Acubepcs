import AdminDashboardLayout from "../../../components/AdminDashboardLayout";
import UserList from "../../../components/UserList"; // your current approval UI

export default function AdminPage() {
  return (
    <AdminDashboardLayout>
      <div id="investments">
        <UserList />
      </div>

      <div id="withdraw" className="mt-10">
        <h2 className="text-xl font-bold mb-2">Withdraw Requests</h2>
        {/* To be implemented */}
        <p>No requests yet.</p>
      </div>
    </AdminDashboardLayout>
  );
}
