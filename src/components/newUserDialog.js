import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';

const NewUserDialog = ({open, onClose, onAddUser }) => {
 
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState(1);
  const [newUserActive, setNewUserActive] = useState(1);
   
  const handleAddUser = () => {
    onAddUser({
      id: uuidv4(),
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      isActive: newUserActive,
    });
    setNewUserEmail(''); // Email'i sıfırla
    setNewUserName(''); // Kullanıcı adını sıfırla
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Yeni Üye Kaydı</DialogTitle>
      <DialogContent>
      
     
        <TextField
          label="Kullanıcı Adı"
          variant="outlined"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          fullWidth
        />
        <TextField
          label="E-mail"
          variant="outlined"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          fullWidth
        />
       
       
        
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={handleAddUser} color="primary">
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewUserDialog;
