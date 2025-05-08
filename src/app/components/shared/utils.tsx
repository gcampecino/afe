export const handleErrorMessage = (field, errors) => {
    let errMsg = "";

    if (field in errors)
        errors[field]?._errors?.forEach((value, key) => {
            errMsg += value + "\n"
        });

    return (<><div className="w-50 dark:text-white text-xs">{errMsg}</div></>);
}

export const validateField = (field, value, errors, Schema) => {

    const validationResult = Schema.shape[field].safeParse(value)
    const issues = []
    validationResult?.error?.issues.forEach((value, key) => {
        issues.push(value.message)
    })

    errors[field] = {
        _errors: issues
    }

    return errors
}