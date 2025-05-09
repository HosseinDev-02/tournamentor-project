const inputValueChangeHandler = (e, setFormData) => {
    const { value, name } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
    }));
};

export default inputValueChangeHandler