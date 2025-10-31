import { TextField, Container } from '@mui/material';
import { EnhancedTable } from '@/components/EnhancedTable';

function App() {
    return (
        <main>
            <section>
                <Container maxWidth="xl">
                    <h1>Operators</h1>
                </Container>
            </section>
            <section>
                <Container maxWidth="xl">
                    <TextField id="outlined-helperText" label="Helper text" defaultValue="Ім’я користувача..." />
                </Container>
            </section>
            <section>
                <Container maxWidth="xl">
                    <EnhancedTable />
                </Container>
            </section>
        </main>
    );
}

export default App;
