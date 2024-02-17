const handleChange = (e) => {
  const { name, value } = e.target;
  setFormInput((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

export { handleChange };
