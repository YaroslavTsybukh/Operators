import { TextField, Container, Typography } from '@mui/material';

import { setSearch } from '@/store/slices/filterSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { EnhancedTable } from '@/components/EnhancedTable';

function App() {
    const search = useAppSelector((state) => state.filter.search);
    const dispatch = useAppDispatch();

    return (
        <main>
            <section>
                <Container maxWidth="xl">
                    <Typography component="h1" variant="h4">
                        Оператори
                    </Typography>
                    <TextField
                        id="outlined-helperText"
                        label="Пошук"
                        placeholder="Ім’я користувача..."
                        value={search}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                        sx={{ marginTop: '56px' }}
                    />
                    <EnhancedTable />
                </Container>
            </section>
        </main>
    );
}

export default App;
