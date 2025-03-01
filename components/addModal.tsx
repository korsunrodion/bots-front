'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import addBot from "@/api/addBot/addBot";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddBot: React.FC<Props> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  
  const [name, setName] = useState('');

  const { mutate } = useMutation({
    mutationFn: async (name: string) => {
      await addBot(name);
      queryClient.invalidateQueries({ queryKey: ['bots'] })
      setName('');
      onClose();
    }
  });

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Create new bot
        <IconButton
          aria-label="close"
          onClick={onClose}
          size="small"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className="flex flex-col gap-[12px]">
        <TextField
          label="Name"
          className="w-full"
          onChange={(e) => setName(e.currentTarget.value)}
          value={name}
        />
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        <Button 
          onClick={onClose} 
          color="inherit"
        >
          Close
        </Button>
        <Button
          onClick={() => mutate(name)}
          variant="contained"
          color="primary"
          disabled={!name}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default AddBot;