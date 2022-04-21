import { useMediaQuery, useTheme } from "@material-ui/core";

const useSmallScreen = () => {
  const theme = useTheme();
  const smallScreen = !useMediaQuery(theme.breakpoints.up("sm"));

  return smallScreen;
};

export default useSmallScreen;