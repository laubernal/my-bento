import '@mantine/core/styles.css';
import {colorsTuple, createTheme, MantineProvider} from '@mantine/core';
import {AppMenu} from './components/appMenu.tsx';
import {ACCENT_COLORS, BRAND_COLORS, WARM_COLORS} from './utils.ts';

const theme = createTheme({
    fontFamily: 'Montserrat, Open Sans, sans-serif',
    primaryColor: 'brand',
    colors: {
        brand: colorsTuple(BRAND_COLORS),
        warm: colorsTuple(WARM_COLORS),
        accent: colorsTuple(ACCENT_COLORS),
    },
    defaultRadius: '10px',
});

function App() {
    return (
        <MantineProvider theme={theme}>
            <AppMenu/>
        </MantineProvider>
    );
    
}

export default App;
