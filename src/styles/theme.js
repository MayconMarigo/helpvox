const DEVICE_SIZES = {
  tabletOrMobile: "768px",
  desktop: "1024px",
};

export const GLOBAL_THEME = {
  colors: {
    primary: "#ff1922",
    primaryHover: "#f47479ff",
    screen: {
      bg: "#F3F4F6",
    },
    navigator: {
      bg: "#ff1922",
    },
    listItems: {
      text: {
        default: "#fff",
        selected: "#111827",
        hover: "#111827",
      },
      background: {
        default: "",
        selected: "#E2E4E7",
        hover: "#f47479ff",
      },
    },
    alerts: {
      error: {
        bg: "#fce1e1",
        text: "#ef4444",
        icon: "❌",
      },
      success: {
        bg: "green",
        text: "#fff",
        icon: "✅",
      },
    },
  },
  borders: {
    radius: "0.375rem",
    color: "#e5e7eb",
    width: "1.25px",
  },
  spacing: {
    padding: {
      navigator: {
        desktop: "1rem",
        tabletOrMobile: "0.5rem",
      },
      container: {
        desktop: "2rem",
        tabletOrMobile: "1rem",
      },
      listItems: {
        desktop: "0.75rem",
        tabletOrMobile: "0.75rem",
      },
    },
  },
  devices: {
    tabletOrMobile: `@media (max-width: ${DEVICE_SIZES.tabletOrMobile})`,
    desktop: `@media (max-width: ${DEVICE_SIZES.desktop})`,
  },
  svg: {
    fontSize: "1.5rem",
  },
  font: {
    listItems: {
      size: "0.875rem",
    },
  },
};
