import { Box } from 'native-base';
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {

  return (
    <Box flex={1} bg="#201B2C">
      <NavigationContainer >
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}