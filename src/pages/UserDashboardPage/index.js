import {
  Heading,
  HStack,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import MainLayout from "layouts/MainLayout";
import {useParams} from "react-router-dom";
import * as User from "services/User";
import {faker} from "@faker-js/faker";

const UserDashboardPage = () => {
  const {id} = useParams();
  const {firstName, lastName, balance} = User.findById(id);
  const issuer = faker.finance.creditCardIssuer();
  return (
    <MainLayout>
      <VStack w="full" flexGrow={1} gap={3}>
        <Heading as="h1" size="lg" textAlign="left" w="full">
          {firstName} {lastName}
        </Heading>
        <HStack borderWidth={1} borderRadius="lg" p={5} w="full">
          <VStack alignItems="flex-start">
            <Stat>
              <StatLabel>Remaining Balance</StatLabel>
              <StatNumber>
                {balance.toLocaleString(undefined, {style: "currency", currency: "PHP"})}
              </StatNumber>
              <StatHelpText display="flex" gap={2}>
                {issuer} &bull; {faker.finance.creditCardNumber(issuer)} &bull;{" "}
                {faker.finance.creditCardCVV()}
              </StatHelpText>
            </Stat>
            <HStack>
              <Button size="sm" colorScheme="green">
                Deposit
              </Button>
              <Button size="sm" colorScheme="red">
                Withdraw
              </Button>
              <Button size="sm" colorScheme="blue">
                Transfer
              </Button>
            </HStack>
          </VStack>
        </HStack>
        <Heading as="h2" size="md" w="full" textAlign="left">
          Transactions
        </Heading>
        <TableContainer borderWidth={1} w="full" maxH="md" borderRadius="lg">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Type</Th>
                <Th>Amount</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>232334535434534</Td>
                <Td>Withdraw</Td>
                <Td>120</Td>
                <Td>{Date.now()}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Heading as="h2" size="md" w="full" textAlign="left">
          Expenses
        </Heading>

        <TableContainer borderWidth={1} w="full" maxH="md" borderRadius="lg">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Type</Th>
                <Th>Amount</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>232334535434534</Td>
                <Td>Withdraw</Td>
                <Td>120</Td>
                <Td>{Date.now()}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </MainLayout>
  );
};

export default UserDashboardPage;
