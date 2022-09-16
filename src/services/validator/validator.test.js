import {isEmpty} from "services/utilities";
import validate from "services/validator";

describe("validator", () => {
  it("can validate required items", () => {
    const obj = {
      shouldHaveValue: null,
    };
    const schema = {shouldHaveValue: {required: true}};
    expect(isEmpty(validate(obj, schema).shouldHaveValue)).toEqual(false);
  });

  it("can validate patterns", () => {
    const obj = {email: "aNotValidEmail"};
    const schema = {
      email: {
        pattern:
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      },
    };
    expect(isEmpty(validate(obj, schema).email)).toEqual(false);
  });

  it("can validate max length of characters", () => {
    const obj = {password: "a".repeat(20)};
    const schema = {password: {length: {max: 9}}};
    expect(isEmpty(validate(obj, schema).password)).toEqual(false);
  });

  it("can validate min length of characters", () => {
    const obj = {password: "a".repeat(3)};
    const schema = {password: {length: {min: 6}}};
    expect(isEmpty(validate(obj, schema).password)).toEqual(false);
  });

  it("validates multiple conditions", () => {
    const obj = {
      username: null,
      password: "123",
      email: "aNotValidEmail",
    };
    const schema = {
      username: {
        required: true,
      },
      password: {
        required: true,
        length: {min: 6},
      },
      email: {
        required: true,
        pattern:
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      },
    };
    console.log(validate(obj, schema));
    expect(isEmpty(validate(obj, schema))).toEqual(false);
  });
});
