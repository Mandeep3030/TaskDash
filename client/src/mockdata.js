// src/mockData.js

export const departments = ['Storage', 'Printing', 'Cutting', 'Assembly', 'Packing'];

// 8-hour shift time slots — 1-hour steps for now
export const timeSlots = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
];

export const machines = [
  { id: 'PRN-01', name: 'Printer 01', department: 'Printing' },
  { id: 'PRN-02', name: 'Printer 02', department: 'Printing' },
  { id: 'PRN-03', name: 'Printer 03', department: 'Printing' },

  { id: 'STO-01', name: 'Storage Zone 1', department: 'Storage' },
  { id: 'CUT-01', name: 'Cutter 01', department: 'Cutting' },
  { id: 'ASM-01', name: 'Assembly Table 01', department: 'Assembly' },
  { id: 'PKG-01', name: 'Packing Line 01', department: 'Packing' },
];

export const jobs = [
  {
    id: '1',
    jobId: 'TASK-83457',
    name: 'Organize Boxes',
    description: 'Use pallet jack to move pallets and sort into bins.',
    department: 'Printing',
    machineId: 'PRN-01',
    employeeName: 'John Doe',
    status: 'pending',
    startSlot: 1,
    durationSlots: 2,
  },
  {
    id: '2',
    jobId: 'TASK-83458',
    name: 'Unload Truck',
    description: 'Unload materials into the loading bay.',
    department: 'Printing',
    machineId: 'PRN-02',
    employeeName: 'John Doe',
    status: 'pending',
    startSlot: 2,
    durationSlots: 3,
  },
  {
    id: '3',
    jobId: 'TASK-83434',
    name: 'Oversee Warehouse 3',
    description:
      'Create a schedule and assign duties based on floor manager requests.',
    department: 'Printing',
    machineId: 'PRN-03',
    employeeName: 'Bill Williams',
    status: 'in-progress',
    startSlot: 0,
    durationSlots: 4,
  },
  {
    id: '4',
    jobId: 'STO-1001',
    name: 'Re-stock Shelf A',
    description: 'Move stock from backroom to shelf A.',
    department: 'Storage',
    machineId: 'STO-01',
    employeeName: 'Jane Smith',
    status: 'pending',
    startSlot: 3,
    durationSlots: 2,
  },
];
