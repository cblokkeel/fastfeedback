import EmptyState from "@/components/dashboard/EmptyState";
import SiteTableSkeleton from "@/components/table/SiteTableSkeleton";
import DashboardShell from "@/components/dashboard/DashboardShell";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import SiteTable from "@/components/table/SiteTable";

const Dashboard = () => {
  const { data } = useSWR("api/sites", fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {data.sites.length ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
};

export default Dashboard;
