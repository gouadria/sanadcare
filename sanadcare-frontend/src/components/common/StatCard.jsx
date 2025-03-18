import { Card, CardContent, Typography } from '@mui/material';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <Card className="shadow-md">
      <CardContent className="flex items-center space-x-4">
        <div className={`p-3 rounded-full text-white ${color}`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <Typography variant="h5">{value}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {title}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;