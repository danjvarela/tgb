import {Breadcrumb, BreadcrumbItem, BreadcrumbLink} from "@chakra-ui/react";

const CustomBreadcrumb = () => {
  return (
    <Breadcrumb w="full" color="gray.400" fontSize="sm">
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href="#">Docs</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
