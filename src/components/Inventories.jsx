import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Input, Flex, Box, Heading } from "@chakra-ui/react";

import { inventoryData } from '../data/inventory';

const Inventories = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInventory = inventoryData.filter(item => 
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Flex direction="column" align="center" maxW="1000px" m="0 auto">
      <Heading as="h2" size="lg" mb={4} textAlign="center">Inventory</Heading>

      <Input
        placeholder="Search by Item Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb={6}
        width="50%"
      />

      <Box overflowX="auto" w="full">
        <Table variant="striped" size="md">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Item Name</Th>
              <Th>Description</Th>
              <Th>Item Code</Th>
              <Th>Serial Number</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredInventory.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td> 
                <Td>{item.itemName}</Td>
                <Td>{item.description}</Td>
                <Td>{item.itemCode}</Td>
                <Td>{item.serialNumber ? item.serialNumber : 'N/A'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default Inventories;
