import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar, Divider } from "@mui/material";

const drawerWidth = 240;

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <Drawer
      variant="permanent"
      style={{
        width: drawerWidth,
        flexShrink: 0,
      }}
      PaperProps={{
        style: {
          width: drawerWidth,
        },
      }}
    >
      <Toolbar />
      <div style={{ overflow: "auto" }}>
        <List>
          {["Manage Product", "Manage Order"].map((text) => (
            <ListItem
              button
              key={text}
              onClick={() => setActiveTab(text)}
              selected={activeTab === text}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    </Drawer>
  );
};

export default Sidebar;
