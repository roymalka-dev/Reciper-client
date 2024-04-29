import { CustomTabPanelType } from "@/types/tabs.types";
import DetailsSection from "./sections/DetailsSection";
import { Box } from "@mui/material";
import CustomTabs from "@/components/common/tabs/CustomTabs";
import RecipesSection from "./sections/RecipesSection";

const ProfilePage = () => {
  const profileTabs: CustomTabPanelType[] = [
    {
      label: "Details",
      locale: "site.pages.profile.tabs.general.title",
      component: DetailsSection,
    },
    {
      label: "Recipes",
      locale: "site.pages.profile.tabs.requests.title",
      component: RecipesSection,
    },
  ];
  return (
    <Box>
      <CustomTabs tabs={profileTabs} />
    </Box>
  );
};

export default ProfilePage;
