import {
  HStack,
  FormControl,
  IconButton,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import ControlledInput from "components/ControlledInput";
import {FaSearch} from "react-icons/fa";

const SearchInput = () => {
  return (
    <HStack as="form">
      <FormControl>
        <InputGroup size="sm">
          <ControlledInput
            size="sm"
            borderRadius="full"
            placeholder="Search User"
            pr={8}
            w={{base: 40, md: 64}}
          />
          <InputRightElement>
            <IconButton
              aria-label="Search User"
              icon={<FaSearch />}
              isRound
              variant="ghost"
              size="xs"
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </HStack>
  );
};
export default SearchInput;
