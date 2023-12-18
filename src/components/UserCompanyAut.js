import React, { useState, useEffect } from "react";
import { getCompanyList } from '../services/dataService';
import { DataGrid } from '@mui/x-data-grid';
import {Box,Typography,Button} from "@mui/material";

const UserCompanyAut = ({onClose}) => {

    const [rows, setRows] = useState([]);

    const columns = [
        
        { field: 'name', headerName: 'Firma Adı', width: 130 },
       
      ];

      useEffect(() => {
        getCompanyList()
          .then((data) => {
            setRows(data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);

      const handleGrantPermission = () => {
        
        onClose();
    };

  
  return (
<div>
<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" sx={{ marginLeft: 2, fontWeight: "bold" }}>
            Firma Listesi
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClose={handleGrantPermission}
          >
           Yetki Ver
          </Button>
          
          
        </Box>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
</div>
    
    
  );
};

export default UserCompanyAut;