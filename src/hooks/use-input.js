import { useState } from 'react';

const useInput = (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue);

  const handleChangeValue = ({ target }) => setValue(target.value);

  return [value];
};

export default useInput;
