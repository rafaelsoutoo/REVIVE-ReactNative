import { Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from '@hooks/useAuth';

export function Routes() {
  const { user } = useAuth();


  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer>
        { <AppRoutes />}
      </NavigationContainer>
    </Box>
  );
}
