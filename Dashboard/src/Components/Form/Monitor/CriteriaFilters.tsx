import CriteriaFilterElement from "./CriteriaFilter";
import IconProp from "Common/Types/Icon/IconProp";
import {
  CheckOn,
  CriteriaFilter,
  FilterType,
} from "Common/Types/Monitor/CriteriaFilter";
import MonitorStep from "Common/Types/Monitor/MonitorStep";
import MonitorType from "Common/Types/Monitor/MonitorType";
import Button, {
  ButtonSize,
  ButtonStyleType,
} from "Common/UI/Components/Button/Button";
import ConfirmModal from "Common/UI/Components/Modal/ConfirmModal";
import React, { FunctionComponent, ReactElement, useEffect } from "react";

export interface ComponentProps {
  initialValue: Array<CriteriaFilter> | undefined;
  onChange?: undefined | ((value: Array<CriteriaFilter>) => void);
  monitorType: MonitorType;
  monitorStep: MonitorStep;
}

const CriteriaFilters: FunctionComponent<ComponentProps> = (
  props: ComponentProps,
): ReactElement => {
  const [criteriaFilters, setCriteriaFilters] = React.useState<
    Array<CriteriaFilter>
  >(props.initialValue || []);

  const [showCantDeleteModal, setShowCantDeleteModal] =
    React.useState<boolean>(false);

  useEffect(() => {
    if (criteriaFilters && props.onChange) {
      props.onChange(criteriaFilters);
    }
  }, [criteriaFilters]);

  return (
    <div>
      {criteriaFilters.map((i: CriteriaFilter, index: number) => {
        return (
          <CriteriaFilterElement
            monitorType={props.monitorType}
            key={index}
            initialValue={i}
            monitorStep={props.monitorStep}
            onDelete={() => {
              if (criteriaFilters.length === 1) {
                setShowCantDeleteModal(true);
                return;
              }

              // remove the criteria filter
              const index: number = criteriaFilters.indexOf(i);
              const newCriteriaFilters: Array<CriteriaFilter> = [
                ...criteriaFilters,
              ];
              newCriteriaFilters.splice(index, 1);
              setCriteriaFilters(newCriteriaFilters);
            }}
            onChange={(value: CriteriaFilter) => {
              const index: number = criteriaFilters.indexOf(i);
              const newCriteriaFilters: Array<CriteriaFilter> = [
                ...criteriaFilters,
              ];
              newCriteriaFilters[index] = value;
              setCriteriaFilters(newCriteriaFilters);
            }}
          />
        );
      })}
      <div className="mt-3 -ml-3">
        <Button
          title="Add Filter"
          buttonSize={ButtonSize.Small}
          icon={IconProp.Add}
          onClick={() => {
            const newCriteriaFilters: Array<CriteriaFilter> = [
              ...criteriaFilters,
            ];
            newCriteriaFilters.push({
              checkOn: CheckOn.IsOnline,
              filterType: FilterType.EqualTo,
              value: "",
            });

            setCriteriaFilters(newCriteriaFilters);
          }}
        />
      </div>
      {showCantDeleteModal ? (
        <ConfirmModal
          description={`We need at least one filter for this criteria. We cant delete one remaining filter. If you don't need filters, please feel free to delete criteria instead.`}
          title={`Cannot delete last remaining filter.`}
          onSubmit={() => {
            setShowCantDeleteModal(false);
          }}
          submitButtonType={ButtonStyleType.NORMAL}
          submitButtonText="Close"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CriteriaFilters;
