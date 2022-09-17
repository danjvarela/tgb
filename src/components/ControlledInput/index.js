import {Input} from "@chakra-ui/react";
import {useState} from "react";

export default ({onChange, ...otherProps}) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };

  return <Input value={value} onChange={handleChange} {...otherProps} />;
};
