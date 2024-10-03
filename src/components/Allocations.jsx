import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Flex,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Divider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiX, FiEye, FiDownload } from 'react-icons/fi';
import jsPDF from 'jspdf';
import moment from 'moment';

import { allocationsData } from '../data/allocations';
import { inventoryData } from '../data/inventory';
import { membersData } from '../data/members';

const Allocations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAllocation, setSelectedAllocation] = useState(null);

  const filteredAllocations = allocationsData.filter(allocation =>
    allocation.memberName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getItemDetails = (itemId) => {
    return inventoryData.find(item => item.id === itemId) || {};
  };

  const getMemberDetails = (memberId) => {
    return membersData.find(member => member.id === memberId) || {};
  };

  const handleViewDetails = (allocation) => {
    setSelectedAllocation(allocation);
    onOpen();
  };

  
  const generateReport = () => {
    const doc = new jsPDF();
    const memberDetails = getMemberDetails(selectedAllocation.memberId);

    doc.setFontSize(20);
    doc.text("Risecom Allocation Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${moment().format('MMMM Do YYYY')}`, 20, 30);
    doc.text(`Member Name: ${selectedAllocation.memberName}`, 20, 40);
    doc.text(`Email: ${memberDetails.workEmail}`, 20, 50);
    doc.text(`Phone: ${memberDetails.phone}`, 20, 60);
    doc.text(`Department: ${memberDetails.department}`, 20, 70);

    doc.setFontSize(14);
    doc.text("Allocated Items:", 20, 90);
    
    const laptopDetails = selectedAllocation.allocatedItems.laptop.hasLaptop ? 
      `${getItemDetails(selectedAllocation.allocatedItems.laptop.itemId).itemName} - ${getItemDetails(selectedAllocation.allocatedItems.laptop.itemId).serialNumber}` : 
      'No laptop allocated';
    doc.text(`Laptop: ${laptopDetails}`, 20, 100);

    const headsetDetails = selectedAllocation.allocatedItems.headSet.hasHeadSet ? 
      `${getItemDetails(selectedAllocation.allocatedItems.headSet.itemId).itemName} - ${getItemDetails(selectedAllocation.allocatedItems.headSet.itemId).itemCode}` : 
      'No headset allocated';
    doc.text(`Headset: ${headsetDetails}`, 20, 110);

    doc.setLineWidth(2);
    doc.setDrawColor(0, 0, 255);
    doc.rect(5, 5, 200, 287); 
    
    const reportName = `${moment().format('YYYY-MM-DD')}_${selectedAllocation.memberName.replace(/\s+/g, '_')}_report.pdf`;
    doc.save(reportName);
  };


  const generateAllAllocationsReport = () => {
    const doc = new jsPDF();
  
    doc.setLineWidth(2);
    doc.setDrawColor(0, 0, 255); 
    doc.rect(5, 5, 200, 287); 
  
    doc.setFontSize(20);
    doc.text("Risecom Inventory Allocations Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${moment().format('MMMM Do YYYY')}`, 20, 30);
    doc.setFontSize(14);
  
    let yPosition = 50;
  
    filteredAllocations.forEach((allocation, index) => {
      if (index > 0 && index % 3 === 0) {
        doc.addPage();
        doc.setDrawColor(0, 0, 255);
        doc.rect(5, 5, 200, 287);       
        yPosition = 20;
      }
  
      doc.setDrawColor(0, 123, 255); 
      doc.setLineWidth(1);
      
      yPosition += 10;
      doc.line(10, yPosition, 200, yPosition);
  
      const memberDetails = getMemberDetails(allocation.memberId);
      doc.text(`Member Name: ${allocation.memberName}`, 20, yPosition + 5);
      doc.text(`Email: ${memberDetails.workEmail}`, 20, yPosition + 15);
      doc.text(`Phone: ${memberDetails.phone}`, 20, yPosition + 25);
      doc.text(`Department: ${memberDetails.department}`, 20, yPosition + 35);
      yPosition += 40;
  
      const laptopDetails = allocation.allocatedItems.laptop.hasLaptop 
        ? `${getItemDetails(allocation.allocatedItems.laptop.itemId).itemName} - ${getItemDetails(allocation.allocatedItems.laptop.itemId).serialNumber}` 
        : 'No laptop allocated';
      doc.text(`Laptop: ${laptopDetails}`, 20, yPosition);
      
      const headsetDetails = allocation.allocatedItems.headSet.hasHeadSet 
        ? `${getItemDetails(allocation.allocatedItems.headSet.itemId).itemName} - ${getItemDetails(allocation.allocatedItems.headSet.itemId).serialNumber}` 
        : 'No headset allocated';
      doc.text(`Headset: ${headsetDetails}`, 20, yPosition + 10);
      yPosition += 20; 
  
      yPosition += 5; 
      doc.line(10, yPosition, 200, yPosition); 
      yPosition += 10; 
    });
  
    const reportName = `All_Allocations_Report_${moment().format('YYYY-MM-DD')}.pdf`;
    doc.save(reportName);
  };
  
  return (
    <Flex direction="column" align="center" maxW="1000px" m="0 auto">
      <Heading mb={5}>Allocations</Heading>
      <Flex mb={5} align="center">
        <Input
          placeholder="Search by member name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          borderColor="teal.300"
          _focus={{ borderColor: "teal.500" }}
        />
        <Button 
          colorScheme="blue" 
          leftIcon={<FiDownload />} 
          onClick={generateAllAllocationsReport}
          ml={3}
        >
          Report
        </Button>
      </Flex>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Member Name</Th>
            <Th>Allocated Laptop</Th>
            <Th>Allocated Headset</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredAllocations.map(allocation => {
            const laptopDetails = getItemDetails(allocation.allocatedItems.laptop.itemId);
            const headsetDetails = getItemDetails(allocation.allocatedItems.headSet.itemId);
            return (
              <Tr key={allocation.allocationId}>
                <Td>{allocation.memberName}</Td>
                <Td>
                  {allocation.allocatedItems.laptop.hasLaptop ? (
                    <>
                      {laptopDetails.itemName} - {laptopDetails.serialNumber}
                    </>
                  ) : (
                    <Text color="red">No Laptop Allocated</Text>
                  )}
                </Td>
                <Td>
                  {allocation.allocatedItems.headSet.hasHeadSet ? (
                    <>
                      {headsetDetails.itemName} - {headsetDetails.itemCode}
                    </>
                  ) : (
                    <FiX color="red" />
                  )}
                </Td>
                <Td>
                  <Button 
                    leftIcon={<FiEye />} 
                    colorScheme="teal" 
                    onClick={() => handleViewDetails(allocation)}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Allocation Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedAllocation && (
              <VStack spacing={4}>
                <Divider />
                <Text fontWeight="bold">Member Name: {selectedAllocation.memberName}</Text>
                <Text>Work mail: {getMemberDetails(selectedAllocation.memberId).workEmail}</Text>
                <Text>Email: {getMemberDetails(selectedAllocation.memberId).personalEmail}</Text>
                <Text>Phone: {getMemberDetails(selectedAllocation.memberId).phone}</Text>
                <Text>Department: {getMemberDetails(selectedAllocation.memberId).department}</Text>
                <Divider />
                <Text fontWeight="bold">Allocated Items:</Text>
                <Text>
                  Laptop: {selectedAllocation.allocatedItems.laptop.hasLaptop ? 
                    `${getItemDetails(selectedAllocation.allocatedItems.laptop.itemId).itemName} - ${getItemDetails(selectedAllocation.allocatedItems.laptop.itemId).serialNumber}` : 
                    'No laptop allocated'}
                </Text>
                <Text>
                  Headset: {selectedAllocation.allocatedItems.headSet.hasHeadSet ? 
                    `${getItemDetails(selectedAllocation.allocatedItems.headSet.itemId).itemName} - ${getItemDetails(selectedAllocation.allocatedItems.headSet.itemId).itemCode}` : 
                    'No headset allocated'}
                </Text>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" leftIcon={<FiDownload />} onClick={generateReport} mr={4}>Report</Button>
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Allocations;
