export const handleErrorMessage = (field : any, errors : any) => {
    let errMsg = "";

    if (field in errors)
        errors[field]?._errors?.forEach((value : any) => {
            errMsg += value + "\n"
        });

    return (<><div className="w-50 dark:text-white text-xs">{errMsg}</div></>);
}

export const validateField = (field : any, value : any, errors : any, Schema : any) => {

    const validationResult = Schema.shape[field].safeParse(value)
    const issues : any = []
    validationResult?.error?.issues.forEach((value : any) => {
        issues.push(value.message)
    })

    errors[field] = {
        _errors: issues
    }

    return errors
}