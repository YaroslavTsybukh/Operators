import { TextField, Container, Typography } from '@mui/material';
import { EnhancedTable } from '@/components/EnhancedTable';

function App() {
    return (
        <main>
            <section>
                <Container maxWidth="xl">
                    <Typography component="h1" variant="h4">
                        Оператори
                    </Typography>
                    <TextField id="outlined-helperText" label="Пошук" placeholder="Ім’я користувача..." sx={{ marginTop: '56px' }} />
                    <EnhancedTable />
                </Container>
            </section>
        </main>
    );
}

export default App;
