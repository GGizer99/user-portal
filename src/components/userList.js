
import React, { useState, useEffect } from "react";
import NewUserDialog from "./newUserDialog";
import UserCompanyAut from "./UserCompanyAut";
import Switch from '@mui/material/Switch';
import {getUserList,updateUserRole,updateEmail,updateUserName,addUser} from "../services/dataService";
import {Select,MenuItem,Modal,Box,Typography,TextField,Grid,Button} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

const UserList = () => {
  const [rows, setRows] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedEmail, setEditedEmail] = useState("");
  const [editedName, setEditedName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCompanyAuthPageOpen, setIsCompanyAuthPageOpen] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(false);

  const columns = [
    {
      field: "email",
      headerName: "E-mail",
      width: 200,
      align: "center",
      renderCell: (params) => (
        <TextField
          variant="outlined"
          value={editedEmail !== "" ? editedEmail : params.row.email}
          onChange={(e) => setEditedEmail(e.target.value)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Kullanıcı Adı",
      width: 150,
      align: "center",
      renderCell: (params) => (
        <TextField
          variant="outlined"
          value={editedName !== "" ? editedName : params.row.name}
          onChange={(e) => setEditedName(e.target.value)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      field: "isActive",
      headerName: "Aktif/Pasif",
      width: 100,
      sortable: false,
      align: "center",
      renderCell: (params) =>
        params.row.isActive === 1 ? <CheckIcon /> : <ClearIcon />,
    },
    {
      field: "role",
      headerName: "Yetki Türü",
      width: 180,
      sortable: false,
      align: "center",
      renderCell: (params) => (
        <Select
          value={params.row.role}
          onChange={(event) => handleRoleChange(event, params.row.id)}
          style={{ width: "100%" }}
        >
          {getRoleOptions()}
        </Select>
      ),
    },
    {
      field: "block",
      headerName: "Blok",
      width: 10,
      sortable: false,
      align: "center",

      renderCell: (params) => (
        <button>
          <CircleOutlinedIcon />
        </button>
      ),
    },
    {
      field: "detay",
      headerName: "Detay",
      width: 60,
      sortable: false,
      align: "center",
      renderCell: (params) => (
        <button onClick={() => handleDetayClick(params.row.id)}>
          <DescriptionOutlinedIcon />
        </button>
      ),
    },
  ];

  useEffect(() => {
    getUserList()
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [showAllUsers]);

  const handleToggleShowAll = () => {
    setShowAllUsers((prevShowAllUsers) => !prevShowAllUsers);
  };

  //Kullanıcı Ekleme
  const handleAddUser = async (newUserData) => {
    try {
      await addUser(newUserData);
      refreshUserList();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Kullanıcı eklenirken hata oluştu:", error);
    }
  };
  // Kullanıcı listesini güncellemek için
  const refreshUserList = () => {
    getUserList()
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //E-mail Güncelleme
  const handleEmailUpdate = (userId) => {
    updateEmail(userId, editedEmail);

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === userId ? { ...row, email: editedEmail } : row
      )
    );

    setEditedEmail("");
  };

  //Kullanıcı Adı Güncelleme
  const handleNameUpdate = (userId) => {
    updateUserName(userId, editedName);

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === userId ? { ...row, name: editedName } : row
      )
    );

    setEditedName("");
  };

  //E-mail ve Kullanıcı Adı Güncelle
  const handleChangesSave = () => {
    if (selectedUserId) {
      handleEmailUpdate(selectedUserId);
      handleNameUpdate(selectedUserId);
      setIsModalOpen(false);
    }
  };

  const handleRoleChange = (event, userId) => {
    const newRole = event.target.value;

    updateUserRole(userId, newRole);

    // Arayüzü güncelle
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === userId ? { ...row, role: newRole } : row
      )
    );
  };

  const handleDetayClick = (userId) => {
    const selectedUser = rows.find((user) => user.id === userId);

    setEditedEmail(selectedUser.email);
    setEditedName(selectedUser.name);

    setSelectedUserId(userId);
    setIsModalOpen(true);
    console.log(`Detay butonuna tıklandı. Kullanıcı ID: ${userId}`);
  };

  const handleModalClose = () => {
    setEditedEmail("");
    setEditedName("");
    setIsModalOpen(false);
  };
  const handleCompanyAuthPageOpen = () => {
    setIsCompanyAuthPageOpen(true);
  };

  const handleCompanySelectionChange = (newCompanies) => {
    setSelectedCompanies(newCompanies);
  };

  const getRoleOptions = () => {
    const roleOptions = ["User", "Admin", "SystemAdmin", "GeneralAdmin"];

    return roleOptions.map((role, index) => (
      <MenuItem key={index + 1} value={index + 1}>
        {role}
      </MenuItem>
    ));
  };

  const selectedUser = rows.find((user) => user.id === selectedUserId);

  return (
    <div>
      <NewUserDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddUser={handleAddUser}
      />

      <div>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" sx={{ marginLeft: 2, fontWeight: "bold" }}>
            Üye Listesi
          </Typography>
          <Switch
            
            color="primary"
            inputProps={{ "aria-label": "Tümünü Göster" }}
            onChange={() => handleToggleShowAll()} 
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsDialogOpen(true)}
          >
            <PersonAddAltOutlinedIcon />
          </Button>
        </Box>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row.id}
          />
        </div>
      </div>

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            p: 2,
          }}
        >
          <Button onClick={handleCompanyAuthPageOpen}>
            Kullanıcı Firma Yetkilendirme
          </Button>
          {isCompanyAuthPageOpen && (
            <UserCompanyAut
              userId={selectedUserId}
              selectedCompanies={selectedCompanies}
              onCompanySelectionChange={handleCompanySelectionChange}
            />
          )}

          <Typography variant="h6" component="div">
            Kullanıcı Detayları
          </Typography>
          {selectedUser && (
            <div>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <TextField
                    label="E-mail"
                    variant="outlined"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Kullanıcı Adı"
                    variant="outlined"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button onClick={handleChangesSave}>Değişiklikleri Kaydet</Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default UserList;
