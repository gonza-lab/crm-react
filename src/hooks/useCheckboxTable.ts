import { EntityId } from '@reduxjs/toolkit';
import { useCallback, useState } from 'react';

const useCheckboxTable = (ids: EntityId[]) => {
  const [selectedItems, setSelectedItems] = useState<EntityId[]>([]);

  const handleToggle = useCallback(
    (id: EntityId) => {
      if (!selectedItems.includes(id)) {
        setSelectedItems([...selectedItems, id]);
        return;
      }

      setSelectedItems(
        selectedItems.reduce<EntityId[]>(
          (acum, curr) => (curr === id ? acum : [...acum, curr]),
          []
        )
      );
    },
    [selectedItems]
  );

  const handleToggleAll = () => {
    setSelectedItems(
      !selectedItems.length
        ? ids
        : selectedItems.length && selectedItems.length !== ids.length
        ? ids
        : []
    );
  };

  return {
    handleToggle,
    handleToggleAll,
    selectedItems,
  };
};

export default useCheckboxTable;
