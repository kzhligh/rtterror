import {
  Alert,
  Box,
  TextField,
  InputAdornment,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Button,
  CircularProgress,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import styles from 'styles/client.module.css';
import {
  GridOverlay,
  DataGrid,
  GridColumns,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import { http } from 'utils/http';
import { useState, useEffect } from 'react';
import { AddCustomerDialog } from 'components/patient/AddCustomerDialog';
import { useRouter } from 'next/router';
import { formatPhoneNumber } from 'utils';
import { GetServerSidePropsResult } from 'next';

interface PatientProps {
  customers: Array<any>;
}

const columns: GridColumns = [
  { field: 'firstName', headerName: 'First name', width: 250, sortable: false },
  { field: 'lastName', headerName: 'Last name', width: 300, sortable: false },
  { field: 'id', headerName: 'ID', width: 70, sortable: false },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 100,
    sortable: false,
  },
  {
    field: 'phone',
    headerName: 'Phone Number',
    sortable: false,
    width: 300,
    valueFormatter: (params: GridValueFormatterParams) =>
      formatPhoneNumber(params.value as string),
  },
  { field: 'email', headerName: 'Email', width: 330, sortable: false },
];

export default function Patient({ customers: initialCustomers }: PatientProps) {
  const router = useRouter();

  const [searchResults, setSearchResults] = useState(undefined);
  const [customers, setCustomers] = useState(initialCustomers);
  const [addCustomerDialogIsOpen, setAddCustomerDialogIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [rowSelection, setRowSelection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const handleDelete = async () => {
    setError(null);
    setLoading(true);
    try {
      const remainingCustomers = await http('/api/v1/customer', {
        method: 'DELETE',
        body: rowSelection,
      });
      setCustomers(remainingCustomers);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setRowSelection([]);
    }
  };

  const handleSearch = async (e) => {
    setError(null);
    setLoading(true);
    try {
      if (e.target.value) {
        const searchResult = await http(`/api/v1/customer/search`, {
          searchParams: { query: e.target.value },
        });
        setSearchResults(searchResult);
      } else {
        setSearchResults(undefined);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getSortedRows = async () => {
      if (sortOption) {
        const sortedCustomers = await http(`/api/v1/customer`, {
          searchParams: {
            sortBy: sortOption,
          },
        });
        setCustomers(sortedCustomers);
      } else {
        const customers = await http(`/api/v1/customer`);
        setCustomers(customers);
      }
    };

    getSortedRows();
  }, [sortOption]);

  return (
    <Box>
      {error && <Alert severity="error">Something wrong happened!</Alert>}

      <h1>Patient</h1>
      <TextField
        onChange={handleSearch}
        className={styles.searchbar}
        placeholder="Search a client by name..."
        label="Search"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 4">
          <h1>Client List</h1>
        </Box>
        <Box
          gridColumn="span 8"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <Box sx={{ paddingX: '10px' }}>Order By</Box>

          <FormControl
            sx={{
              marginX: '10px',
            }}
          >
            <InputLabel>Sort</InputLabel>
            <Select
              placeholder="Sort..."
              label="Sort"
              data-cy="patientSort"
              value={sortOption}
              defaultValue=""
              onChange={(e) => setSortOption(e.target.value)}
              sx={{
                minWidth: '100px',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem data-cy="sortFirstName" value={'firstName'}>
                First Name
              </MenuItem>
              <MenuItem value={'lastName'}>Last Name</MenuItem>
              <MenuItem value={'email'}>Email</MenuItem>
            </Select>
          </FormControl>

          <Stack
            spacing={2}
            direction="row"
            height="100%"
            py="1.125rem"
            mx="2rem"
          >
            <Button
              variant="outlined"
              data-cy="patientCreate"
              onClick={() => setAddCustomerDialogIsOpen(true)}
            >
              New Client
            </Button>
            <Button
              variant="outlined"
              disabled={!rowSelection.length}
              data-cy="patientDelete"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Box>

      <Divider />

      <DataGrid
        style={{ minHeight: '60%', height: '560px' }}
        rows={!!searchResults ? searchResults : customers}
        columns={columns}
        pagination
        loading={loading}
        pageSize={8}
        onRowClick={({ row }) =>
          router.push({
            pathname: '/patient/[pid]',
            query: { pid: row.id },
          })
        }
        rowsPerPageOptions={[8]}
        checkboxSelection
        hideFooterSelectedRowCount
        disableColumnMenu
        selectionModel={rowSelection}
        onSelectionModelChange={(rows) => setRowSelection(rows)}
        components={{
          LoadingOverlay: () => (
            <GridOverlay
              style={{
                zIndex: 1,
                backgroundColor: 'white',
                opacity: 0.9,
              }}
            >
              <CircularProgress />
            </GridOverlay>
          ),
        }}
      />

      <AddCustomerDialog
        open={addCustomerDialogIsOpen}
        onClose={() => setAddCustomerDialogIsOpen(false)}
        onCustomerAdded={(newCustomer) => {
          setCustomers((customers) => [newCustomer, ...customers]);
          setAddCustomerDialogIsOpen(false);
        }}
        maxWidth="md"
        fullWidth
      />
    </Box>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<PatientProps>
> {
  const customers = await http(`/api/v1/customer`);

  return {
    props: {
      customers,
    },
  };
}
