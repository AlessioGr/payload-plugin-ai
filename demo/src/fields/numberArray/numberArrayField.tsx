import { Field } from "payload/types";

import { cloneDeep } from "lodash";
import { FieldBase, PointField } from "payload/dist/fields/config/types";
import React, { useCallback } from "react";
import FieldDescription from "payload/dist/admin/components/forms/FieldDescription";
import Label from "payload/dist/admin/components/forms/Label";

export function numberArrayField(
  props: Omit<FieldBase, "name"> & {
    name?: string;
  }
): Field {
  const { name, label } = props;

  return {
    name: name ? name : "numberArray",
    type: "point",
    label: label ? label : "Number Array",
    ...props,
    admin: {
      ...props.admin,
      components: {
        Field: (args) =>
          NumberArrayFieldComponent({
            ...args,
          }),
      },
    },
  };
}

export type Props = Omit<PointField, "type"> & {
  path?: string;
};

const NumberArrayFieldComponent: React.FC<Props> = (props) => {
  const {
    editorConfig,
    path: pathFromProps,
    required,
    validate,
    defaultValue: defaultValueFromProps, // TODO: Accept different defaultValue
    name,
    label,
    admin,
  } = props;

  const path = pathFromProps || name;

  const field = useField<{}>({
    path: path, // required
    validate,
  });



  // Here is what `useField` sends back
  const {
    showError, // whether the field should show as errored
    errorMessage, // the error message to show, if showError
    value,
    setValue, // method to set the field's value in form state
    initialValue, // TODO: the initial value that the field mounted with,
  } = field;

  return (
    <div
      className={'numberarrayfield'}
    >
      <div className={`${'numberarrayfield'}__wrap`}>
        <Label
          htmlFor={`field-${path.replace(/\./gi, "__")}`}
          label={label}
          required={required}
        />

        <p>
          <input
            type="text"
            id={`field-${path.replace(/\./gi, "__")}`}
            value={''+value}
            onChange={(e) => {
              setValue([1, 2, 33, 54]);
            }
            }
          />
        </p>
        <FieldDescription value={value} description={''} />
      </div>
    </div>
  );
};
