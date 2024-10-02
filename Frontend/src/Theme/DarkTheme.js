import { createTheme } from "@mui/material";

 export const darkTheme=createTheme({
    palette:{
        mode:"dark",
        primary:{
            main:"#121212"
        },
        secondary:{
            main:"#181818"
        },
        background:{
            
            default:"#121212",
            paper:"#282828"
        } }
})

// import { createTheme } from "@mui/material";

// export const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#121212",
//     },
//     secondary: {
//       main: "#181818",
//     },
//     background: {
//       default: "#121212", // Set the default background color
//       paper: "#282828",
//     },
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           backgroundColor: "#121212", // Override the body's background color
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#282828", // Override the Card component's background color
//         },
//       },
//     },
//     // Add similar overrides for other components if necessary
//   },
// });

