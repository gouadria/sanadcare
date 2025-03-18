

import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  MedicalServices as MedicalServicesIcon,
  LocalHospital as HospitalIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';

const Sidebar = () => {
  return (
    <div className="bg-gray-100 h-screen w-64 p-4">
      <div className="mb-8 flex justify-center items-center">
        <img 
          src="/logo.svg" 
          alt="SanadCare" 
          className="w-36 h-36 object-contain"
        />
      </div>
      
      <List component="nav">
        <ListItem 
          button 
          component="a" 
          href="/dashboard"
          className="mb-2 rounded-lg hover:bg-gray-200"
        >
          <ListItemIcon>
            <DashboardIcon className="text-blue-600" />
          </ListItemIcon>
          <ListItemText 
            primary="Tableau de bord" 
            className="text-gray-800 font-medium"
          />
        </ListItem>
        
        <ListItem 
          button 
          component="a" 
          href="/patients"
          className="mb-2 rounded-lg hover:bg-gray-200"
        >
          <ListItemIcon>
            <PeopleIcon className="text-green-600" />
          </ListItemIcon>
          <ListItemText 
            primary="Patients" 
            className="text-gray-800 font-medium"
          />
        </ListItem>

        <ListItem 
          button 
          component="a" 
          href="/staff"
          className="mb-2 rounded-lg hover:bg-gray-200"
        >
          <ListItemIcon>
            <MedicalServicesIcon className="text-red-600" />
          </ListItemIcon>
          <ListItemText 
            primary="Personnel médical" 
            className="text-gray-800 font-medium"
          />
        </ListItem>

        <ListItem 
          button 
          component="a" 
          href="/hospitalization"
          className="mb-2 rounded-lg hover:bg-gray-200"
        >
          <ListItemIcon>
            <HospitalIcon className="text-purple-600" />
          </ListItemIcon>
          <ListItemText 
            primary="Hospitalisation" 
            className="text-gray-800 font-medium"
          />
        </ListItem>

        <ListItem 
          button 
          component="a" 
          href="/reminders"
          className="mb-2 rounded-lg hover:bg-gray-200"
        >
          <ListItemIcon>
            <NotificationsIcon className="text-orange-600" />
          </ListItemIcon>
          <ListItemText 
            primary="Rappels" 
            className="text-gray-800 font-medium"
          />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;