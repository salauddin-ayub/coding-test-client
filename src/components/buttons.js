import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
/** @className =  any className ex: padding/ margin /color*/
/** @title = Title of the button ex: Save*/
/** @disabled = Disable the button => true / false*/
/** @label = Button name ex: Save*/
/** @icon = Icon Name ex: pi pi-check */
/** @onClick = onClick Action Method */
/** @loading = if button disabled and loading */
/** @type = button type ex: submit, reset */

export const CommonButton = ({
  type = "submit",
  className,
  title,
  disabled,
  label,
  icon,
  onClick,
  loading,
}) => {
  return (
    <Button
      type={type}
      label={label}
      title={title}
      icon={icon}
      disabled={disabled}
      className={className}
      onClick={onClick}
      loading={loading}
    />
  );
};

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div>
      <CommonButton
        type="button"
        onClick={() => navigate(-1)}
        className=" p-button-raised bg-gray-400 my-4"
        title="Back"
        label="Back"
        icon="pi pi-arrow-left"
        color="p-button-raised"
      />
    </div>
  );
};
