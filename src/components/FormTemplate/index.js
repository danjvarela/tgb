import {Divider, Heading, Image} from "@chakra-ui/react";
import FormsLayout from "layouts/FormsLayout";
import Card from "components/Card";
import grapes from "assets/grapes.svg";

export default ({title, formElement}) => {
  return (
    <FormsLayout>
      <Card
        maxW={{base: "sm", md: "xl"}}
        w="full"
        gap={5}
        flexDir={{base: "column", md: "row"}}
      >
        <Heading
          as="h1"
          size="md"
          textAlign={{base: "center", md: "left"}}
          display="flex"
          flexDir={{base: "row-reverse", md: "column"}}
          gap={2}
        >
          {title}
          <Image src={grapes} w={{base: 5, md: 9}} h="auto" />
        </Heading>
        {formElement}
      </Card>
    </FormsLayout>
  );
};
