import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { CustomTabPanelType } from "@/types/tabs.types";

/**
 * Props for the CustomTabPanel component.
 */
interface TabPanelProps {
  /**
   * The content to be displayed inside the tab panel when it is active.
   */
  children?: React.ReactNode;

  /**
   * Unique index assigned to each tab panel corresponding to its order.
   */
  index: number;

  /**
   * The index of the currently active tab. Used to determine if the panel should be visible.
   */
  value: number;
}

/**
 * CustomTabPanel component that renders the content area for a tab.
 * This component is responsible for displaying the content of an active tab and hiding inactive ones.
 */
const CustomTabPanel = React.memo(function (props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
});

/**
 * Accessibility props generator for tabs and their associated content panels.
 * This function ensures that each Tab and its TabPanel are properly linked for accessibility purposes.
 * @param {number} index The index of the tab.
 * @returns An object containing accessibility-related props.
 */
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

/**
 * CustomTabs component to render a set of tabs and their content.
 * This component manages the active state of each tab and renders the content for the currently active tab.
 *
 * @param {{ tabs: CustomTabPanelType[] }} props The properties for the CustomTabs component, including an array of tab definitions.
 */
export default function CustomTabs({ tabs }: { tabs: CustomTabPanelType[] }) {
  const [value, setValue] = React.useState(0); // State to track the currently active tab

  // Handler for tab change events
  const handleChange = React.useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    },
    [setValue]
  );

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs bar */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {/* Content panels for each tab */}
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {/* Dynamically creates the component for the tab content, if provided */}
          {tab.component
            ? React.createElement(tab.component, tab.data || {})
            : null}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
