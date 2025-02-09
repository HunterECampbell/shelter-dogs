export const breakpoint = {
  phone: 550,
  tablet: 1100,
  laptop: 1500,
  desktop: 1800,
};

export const mediaQueryBreakpoint = {
  phoneAndUp: `(min-width: ${breakpoint.phone}px)`,
  phoneAndDown: `(max-width: ${breakpoint.phone}px)`,
  tabletAndUp: `(min-width: ${breakpoint.tablet}px)`,
  tabletAndDown: `(max-width: ${breakpoint.tablet}px)`,
  laptopAndUp: `(min-width: ${breakpoint.laptop}px)`,
  laptopAndDown: `(max-width: ${breakpoint.laptop}px)`,
  desktopAndUp: `(min-width: ${breakpoint.desktop}px)`,
  desktopAndDown: `(max-width: ${breakpoint.desktop}px)`,
};
