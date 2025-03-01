'use client';

import getBots from "@/api/getBots/getBots";
import { Bot, TaskStatus, TaskStatusLabel } from "@/types";
import { Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import AddBot from "./addModal";

const Bots: React.FC = () => {
  const queryClient = useQueryClient();
  
  const { data: botsData } = useQuery<Bot[]>({
    queryKey: ["bots"],
    queryFn: () => getBots(),
  });

  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL);
    
    socket.on('updated', () => {
      queryClient.invalidateQueries({ queryKey: ['bots'] })
    });

    return () => {
      socket.disconnect();
    }
  }, [queryClient]);

  return (
    <Container className="py-[24px]">
      <AddBot isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />

      <Box className="flex items-center gap-[16px]">
        <Typography>Bots</Typography>
        <Button variant="outlined" onClick={() => setAddModalOpen(true)}>Add new</Button>
      </Box>
      <TableContainer className="mt-[12px]">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width='30%'><b>Name</b></TableCell>
              <TableCell><b>Tasks</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {botsData?.map((item) => (
              <TableRow key={item.id}>
                <TableCell width='30%'>{item.name}</TableCell>
                <TableCell>
                  {item.tasks.map((item) => (
                    <div key={item.id} className="not-first:mt-[12px]">
                      {item.name}
                      <div className="flex items-center gap-[6px]">
                        <div className={clsx("rounded-[100%] w-[12px] h-[12px]", {
                          'bg-gray-400': item.status === TaskStatus.Pending,
                          'bg-[#FFCA28]': item.status === TaskStatus.InProgress,
                          'bg-[#4CAF50]': item.status === TaskStatus.Completed,
                        })} />
                        {TaskStatusLabel[item.status]}
                      </div>
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
};

export default Bots;