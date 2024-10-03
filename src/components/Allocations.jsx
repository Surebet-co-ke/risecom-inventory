import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Input, Box, Flex, Heading, Button } from "@chakra-ui/react";
import { allocationsData } from '../data/allocations';
import { FiCheck, FiX } from 'react-icons/fi';
import jsPDF from 'jspdf';
import moment from 'moment';

const Allocations = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAllocations = allocationsData.filter(member => 
    member.memberName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text('Inventory Allocation Report', 20, 20);
    doc.text(`Date: ${moment().format('YYYY-MM-DD')}`, 20, 30);

    // Prepare the content
    let yOffset = 50;
    filteredAllocations.forEach((member) => {
      doc.text(`Member: ${member.memberName}`, 20, yOffset);
      doc.text(`Laptop: ${member.allocatedItems.Laptop ? '✓' : '✗'}`, 20, yOffset + 10);
      doc.text(`Head Set: ${member.allocatedItems.HeadSet ? '✓' : '✗'}`, 20, yOffset + 20);
      yOffset += 30;
    });

    // Save the PDF
    doc.save('inventory-allocation-report.pdf');
  };

  return (
    <Flex direction="column" align="center" maxW="1000px" m="0 auto">
      <Heading as="h2" size="lg" mb={4} textAlign="center">Allocations</Heading>

      <Input
        placeholder="Search by Member Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb={6}
        width="50%"
      />

      <Button mb={4} onClick={generateReport} colorScheme="blue">Download Report</Button>

      <Box overflowX="auto" w="full">
        <Table variant="striped" size="md">
          <Thead>
            <Tr>
              <Th>Member Name</Th>
              <Th>Laptop Allocated</Th>
              <Th>Head Set Allocated</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredAllocations.map((member) => (
              <Tr key={member.memberId}>
                <Td>{member.memberName}</Td>
                <Td>{member.allocatedItems.Laptop ? <FiCheck color="green" /> : <FiX color="red" />}</Td>
                <Td>{member.allocatedItems.HeadSet ? <FiCheck color="green" /> : <FiX color="red" />}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default Allocations;
