import React from 'react';
import '../DataTable/DataTable.css';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const TaskDataGrid = ({ users, editTask }) => {
 

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email Id', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      width: 80,
      renderCell: (params) => {
        const user = users.find((t) => t._id === params.row.id);
        return (
          <div className='CellAction'>
            <div className='viewbutton'>
              <EditIcon className='editIcon'  onClick={() => editTask(user._id)} />
            </div>
            <div className='viewbutton'>
              <RemoveRedEyeIcon className='viewIcon' />
            </div>
          </div>
        );
      },
    },
  ];

  const rows = users.map((user) => ({
    key: user._id,
    id: user._id,
    name: user.name,
    email: user.email,
 
  }));
  
  return (
    <div className='data-table'>
      <DataGrid style={{ fontSize: 16, fontWeight: 600 }} rows={rows} columns={columns} />
    </div>
  );
};

export default TaskDataGrid;
