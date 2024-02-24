import { z } from "zod";

// Create schema
const stringSchema = z.string();
const numberSchema = z.number();
const nullSchema = z.null();
const booleanSchema = z.boolean();
const undefinedSchema = z.undefined();

// Test inputs
const name = "Ryan";
const number = 123;
const nulllish = null;
const boolean = false;
const undefinedVal = undefined;

// Return same value on success validation or error on fail validation
stringSchema.parse(name);
numberSchema.parse(number);
booleanSchema.parse(boolean);
nullSchema.parse(nulllish);
undefinedSchema.parse(undefinedVal);

// Object schema
const userSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
  isAdmin: z.boolean().optional(),
  phone: z.string(),
});

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
});

const citizenSchema = userSchema.merge(addressSchema);

type UserType = z.infer<typeof userSchema>;
type AddressType = z.infer<typeof addressSchema>;
type CitizenType = z.infer<typeof citizenSchema>;

const user: UserType = {
  age: 23,
  email: "juan@gmail.com",
  name: "Juan",
  isAdmin: true,
  phone: "+5133899230",
};

const address: AddressType = {
  street: "Calle 1",
  city: "Bogota",
};

const citizen: CitizenType = {
  age: 23,
  email: "juan@gmail.com",
  city: "Bogota",
  street: "Calle 1",
  name: "Juan",
  isAdmin: true,
  phone: "+5133899230",
};

const validateUser = userSchema.parse(user);
const validateAddress = addressSchema.parse(address);
const validateCitizen = citizenSchema.parse(citizen);
console.log(validateUser);
console.log(validateAddress);
console.log(validateCitizen);

// Arrays schemas
const stringArraySchema = z.array(z.string());
const numberArraySchema = z.array(z.number());
const optionalStringArraySchema1 = z.array(z.string().optional());
const optionalStringArraySchema2 = z.array(z.string()).optional();

type StringArrayType = z.infer<typeof stringArraySchema>;
type NumberArrayType = z.infer<typeof numberArraySchema>;
type OptionalStringArrayType1 = z.infer<typeof optionalStringArraySchema1>;
type OptionalStringArrayType2 = z.infer<typeof optionalStringArraySchema2>;

const stringArray: StringArrayType = ["a", "b", "c"];
const numberArray: NumberArrayType = [1, 2, 3];
const optionalStringArray1: OptionalStringArrayType1 = ["validate", undefined];
const optionalStringArray2: OptionalStringArrayType2 = undefined;

const validateStringArray = stringArraySchema.parse(stringArray);
const validateNumberArray = numberArraySchema.parse(numberArray);
const validateOptionalStringArray1 =
  optionalStringArraySchema1.parse(optionalStringArray1);
const validateOptionalStringArray2 =
  optionalStringArraySchema2.parse(optionalStringArray2);

console.log(validateStringArray);
console.log(validateNumberArray);
console.log(validateOptionalStringArray1);
console.log(validateOptionalStringArray2);
