import {
  HStack,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import DepositForm from "./components/DepositForm";
import WithdrawForm from "./components/WithdrawFrom";
import TransferForm from "./components/TransferForm";

const CreditCard = ({user, onTransactionChange, onTransferChange}) => {
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
          <WithdrawForm user={user} onTransactionChange={onTransactionChange} />
          <TransferForm user={user} onTransferChange={onTransferChange} />
        </HStack>
      </VStack>
    </HStack>
  );
};

export default CreditCard;
