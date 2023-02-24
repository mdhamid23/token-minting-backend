import { plainToClass } from "class-transformer";
import {
  registerDecorator,
  validateSync,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

/**
 * @decorator
 * @description A custom decorator to validate a validation-schema within a validation schema upload N levels
 * @param schema The validation Class
 */
export function ValidateNested(
  schema: new () => any,
  validationOptions?: ValidationOptions
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "ValidateNested",
      target: object?.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          args.value;
          if (Array.isArray(value)) {
            for (let i = 0; i < (<Array<any>>value).length; i++) {
              if (validateSync(plainToClass(schema, value[i])).length) {
                return false;
              }
            }
            return true;
          } else
            return validateSync(plainToClass(schema, value)).length
              ? false
              : true;
        },
        defaultMessage(args) {
          if (Array.isArray(args?.value)) {
            for (let i = 0; i < (<Array<any>>args?.value).length; i++) {
              return (
                `${args?.property}::index${i} -> ` +
                validateSync(plainToClass(schema, args?.value[i]))
                  .map((e) => e.constraints)
                  .reduce(
                    (acc: string[], next) =>
                      acc.concat(Object.values(next || {})),
                    []
                  )
              ).toString();
            }
          } else
            return (
              `${args?.property}: ` +
              validateSync(plainToClass(schema, args?.value))
                .map((e) => e.constraints)
                .reduce(
                  (acc: string[], next) =>
                    acc.concat(Object.values(next || {})),
                  []
                )
            ).toString();
          return "";
        },
      },
    });
  };
}
