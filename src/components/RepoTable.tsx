import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../hooks';
import { getRepositories, setPage } from '../store/repoSlice';

export const RepositoryTable = () => {
  const dispatch = useAppDispatch();
  const { repositories, totalCount, currentPage, status } = useAppSelector((state) => state.repositories);

  const handleChangePage = (_: unknown, newPage: number) => {
    dispatch(setPage(newPage + 1));
    dispatch(getRepositories({ query: 'react', sort: 'stars', order: 'desc', page: newPage + 1, perPage: 10 }));
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="repository table">
        <TableHead>
          <TableRow>
            <TableCell>Название репозитория</TableCell>
            <TableCell>Язык</TableCell>
            <TableCell align="right">
              <TableSortLabel active direction="desc">
                Число форков
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel active direction="desc">
                Число звёзд
              </TableSortLabel>
            </TableCell>
            <TableCell>Дата обновления</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {status === 'loading' ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Загрузка...
              </TableCell>
            </TableRow>
          ) : (
            repositories.map((repo) => (
              <TableRow key={repo.id}>
                <TableCell component="th" scope="row">
                  {repo.name}
                </TableCell>
                <TableCell>{repo.language}</TableCell>
                <TableCell align="right">{repo.forks_count}</TableCell>
                <TableCell align="right">{repo.stargazers_count}</TableCell>
                <TableCell>{new Date(repo.updated_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={totalCount}
        rowsPerPage={10}
        page={currentPage - 1}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};
