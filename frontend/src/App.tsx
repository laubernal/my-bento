import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';
import {AppMenu} from './components/appMenu.tsx';

function App() {
    return (
        <MantineProvider>
            <>
                <AppMenu />
            </>
        </MantineProvider>
    );
    
}

export default App;
