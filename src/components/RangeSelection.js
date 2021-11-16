import React, {useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {Grid, Button} from '@mui/material';
import FormDialog from './dialog';
import 'ag-grid-enterprise';


export default function RangeSelection() {
    const formInitializer = {id: "", name: "", email:"", phone:"", dob:"" }

    const statusBar = {
        statusPanels: [
            {
                statusPanel: 'agAggregationComponent',
                statusPanelParams: {
                    // possible values are: 'count', 'sum', 'min', 'max', 'avg'
                    aggFuncs: ['min', 'max', 'avg', 'count', 'sum', 'min', 'max', 'avg']
                }
            }
        ]
    };

    const [formdata, setFormData] = useState(formInitializer)
    const [gridApi, setGridApi] = useState(null)
    const [tableData, setTableData] = useState([
        {id: 1, name:"Test", email: "fdfdg", phone: "444544", dob:"11/21/2000"}
    ])
    const url = 'https://localhost:4000/users'
    const columnDefs = [
        {headerName: "ID", field: "id"},
        {headerName: "Name", field: "name", enableRowGroup:true},
        {headerName: "Email", field: "email"},
        {headerName: "phone", field: "phone"},
        {headerName: "Date of Birth", field: "dob"},
        {
            headerName: "Actions", field: "id", cellRendererFramework: (params) => <div>
              <Button variant="outlined" onClick={()=> updateHandler(params.data)} color="primary" >Update</Button>
              <Button variant="outlined" onClick={() => deleteHandler(params.value)} color="secondary" >Delete</Button>
            </div>
          }
        ]

        const updateHandler = (oldData) => {
            console.log(oldData)
            setFormData(oldData)
            handleClickOpen()
        }

        const deleteHandler = (id) => {
         const confirmDialog = window.confirm("Are you sure you want to delete this data?", id)
         console.log(id);
         if (confirmDialog) {
             const result = tableData.filter(item => item.id!==id)
             console.log("updated", result);
            setTableData(result)
            console.log("tableData", tableData);
            }
        }
            // useEffect(() => {
    //     getUsers()
    //   }, [])

    //   const getUsers = () => {
    //     fetch(url).then(resp => resp.json()).then(resp => setTableData(resp))
    //      .catch(err => {
    //         throw new Error(err)
    //       })
    //   }

    const [open, setOpen] = React.useState(false);
    const random = Math.floor(Math.random() * 10000);
   

    const onChange = (e) => {
        const {value, id} = e.target
        // console.log(value, id);
        setFormData({...formdata, [id]:value})
    }
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const onGridReady = (params) => {
        setGridApi(params);
    }

    const defaultColDef = {
        sortable: true,
        flex:1, filter: true,
        floatingFilter: true
    }

    const handleFormSubmit = () => {  
        // const last = tableData[tableData.length - 1];
        // const newId = last.id + 1;
        //checks for updating 
        if(formdata.id) { 
             setFormData(() => {
                return [formdata];
              }
              );
           deleteHandler(formdata.id)
           //console.log("Mapu",previous.filter(el => el.id!==formdata.id)),
           setTableData((previous, index) => 
           {return [ 
            ...previous, formdata
            ]})
           setFormData(formInitializer)
           //console.log(tableData )
        }
        else {
    setFormData((prev) => {
        
      return [formdata, formdata.id = random];
    }
    );
    setTableData((previous) => {return [...previous, formdata]})
    setFormData(formInitializer)
    console.log(tableData )}
    }

    return (
        <div className="App">
            <h1 align="center">React CRUD App</h1>
            <Grid align="right">
             <Button variant="contained" color="primary" onClick={handleClickOpen}>Add User</Button>
            </Grid>
        <div className="ag-theme-alpine" style={{height: '400px'}}>
        <AgGridReact 
        rowGroupPanelShow={"always"}
        rowData={tableData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        statusBar={statusBar}
        enableRangeSelection={true}
        suppressDragLeaveHidesColumns={true}
          suppressMakeColumnVisibleAfterUnGroup={true}
        // rowSelection={'single'}

        />
        </div>
        <FormDialog open={open} handleClose={handleClose} data={formdata} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
        </div>
      
    )




}