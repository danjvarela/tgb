import {
  HStack,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
} from "@chakra-ui/react";
import DepositForm from "./components/DepositForm";

const CreditCard = ({user, onTransactionChange}) => {
  const {balance, cardIssuer, cardNumber, cardCVV} = user;
  return (
    <HStack borderWidth={1} borderRadius="lg" p={5} w="full">
      <VStack alignItems="flex-start">
        <Stat>
          <StatLabel>Remaining Balance</StatLabel>
          <StatNumber>
            {balance.toLocaleString(undefined, {style: "currency", currency: "PHP"})}
          </StatNumber>
          <StatHelpText display="flex" gap={2}>
            {cardIssuer} &bull; {cardNumber} &bull; {cardCVV}
          </StatHelpText>
        </Stat>
        <HStack>
          <DepositForm user={user} onTransactionChange={onTransactionChange} />
          <Button size="sm" colorScheme="red">
            Withdraw
          </Button>
          <Button size="sm" colorScheme="blue">
            Transfer
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default CreditCard;
