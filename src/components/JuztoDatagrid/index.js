import * as React from 'react';
import { 
    DataGrid, 
    GridActionsCellItem, 
    GridDeleteIcon
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { 
    createProduct,
    deleteProduct, 
    getProductList, 
    updateProduct 
} from '../../api';
import { 
    Box, 
    Button, 
    FormControlLabel, 
    FormGroup, 
    Switch, 
    TextField } from '@mui/material';


export const JuztoDatagrid = () => {
    const [dataRow, setDataRow] = React.useState([])
    const [name, setName] = React.useState("");
    const [isActive, setIsActive] = React.useState(true);
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        const productData = () => {
            getProductList()
                .then(response => response.json())
                .then(data => setDataRow(data))
                .catch(err => console.log(err))
        };
        productData();
    }, []);

    const updateTable = (event) => {
        updateProduct({ body: event, id: event.id });
        return event;
    }

    const handleIsActiveChange = (event) => {
        setIsActive(!isActive);
    }

    const handleDeleteClick = (data) => () => {
        const row = dataRow.filter((row) => row.id === data.id);
        deleteProduct(row[0]);
        return window.location.reload(true)
    };

    const handleSubmitform = () => {
        const body = {
            name: name,
            description: description,
            is_active: isActive
        }

        return createProduct({body: body})
    } 

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name', width: 180, editable: true },
        { field: 'description', headerName: 'Description', width: 300, editable: true },
        { field: 'created_at', headerName: 'Date Created', width: 180 },
        { field: 'updated_at', headerName: 'Date Updated', width: 180 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
    
                return [
                    <GridActionsCellItem
                    icon={<GridDeleteIcon />}
                    label="Delete"
                    onClick={handleDeleteClick({id: id})}
                    color="inherit"
                    />,
                ];
                },
            },
    ];

    return (
        <div>
            
            <Box mt={4} ml={4} alignContent={'center'} flex={0} onSubmit={handleSubmitform} component={'form'} display="flex" justifyContent="center" alignItems="center"  >
                    <FormGroup >
                    <TextField label='name' onChange={(e) => setName(e.target.value)} required />  
                    <TextField label='Description' onChange={(e) => setDescription(e.target.value)} sx={{marginTop: 4}}  />
                    <FormControlLabel
                        control={
                            <Switch checked={isActive} onChange={handleIsActiveChange}/>
                        }
                        label="Is active"
                        sx={{marginTop: 4}}
                    />
                    
                    </FormGroup>
                    <Button color="primary" startIcon={<AddIcon />} type='submit' sx={{marginTop: 4}} >
                        Save
                    </Button>
            </Box>
            
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                    sx={{marginTop: 4}} 
                    rows={dataRow} 
                    columns={columns}
                    processRowUpdate={(e) => updateTable(e)}
                    onProcessRowUpdateError={(e) => console.log(e)}
                />
            </div>
        </div>
    );
}