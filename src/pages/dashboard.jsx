import { useUser } from "@/context/store";
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Button } from "@mui/material";
import DataTable from "./loanTable";
import { supabase } from "@/lib/client";
import { useNavigate, useLocation } from "react-router-dom";
import { theme } from "@/lib/theme";
import LoanStepperForm from "./loanForm";
import DashboardData from "../components/dashboarddata";
import AllUserData from "./allUserTable";
import SinglePageForm from "./eventForm";

import "@copilotkit/react-ui/styles.css";

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {pathname === "/My-Event-Requests" || pathname === "/Event-Requests" ? (
        <DataTable />
      ) : pathname === "/New-Event" ? (
        <SinglePageForm />
      ) : pathname === "/dashboard" ? (
        <DashboardData />
      ) : pathname === "/users" ? (
        <AllUserData />
      ) : (
        <Typography>Dashboard content for {pathname}</Typography>
      )}
    </Box>
  );
}

const SidebarFooterAccount = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <Button
      onClick={handleLogout}
      variant="text"
      size="large"
      endIcon={<LogoutIcon />}
    >
      Log Out
    </Button>
  );
};

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding(props) {
  const { user, loading, admin, loanData } = useUser();
  const copilotApi = import.meta.env.VITE_COPILOTKIT_KEY;

  const navigate = useNavigate();
  const location = useLocation();

  const NAVIGATION = [
    {
      segment: "dashboard",
      title: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      segment: admin ? "Event-Requests" : "My-Event-Requests",
      title: admin ? "Event Requests" : "My Event Requests",
      icon: <DescriptionIcon />,
    },
    ...(admin
      ? [
          {
            segment: "users",
            title: "Users",
            icon: <PeopleAltIcon />,
          },
        ]
      : [
          {
            segment: "New-Event",
            title: "Add New Event",
            icon: <AddCircleIcon />,
          },
        ]),
  ];

  const { window } = props;

  const router = React.useMemo(
    () => ({
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (path) => navigate(path),
    }),
    [location, navigate]
  );

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start

    <AppProvider
      theme={theme}
      navigation={NAVIGATION}
      branding={{
        logo: "",
        title: "Even Management",
        homeUrl: "/toolpad/core/introduction",
      }}
      router={router}
      window={demoWindow}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: () => null,
          sidebarFooter: SidebarFooterAccount,
        }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>

    // preview-end
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBranding;
