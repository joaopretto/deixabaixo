export const handleInputChange = (
    name: string, 
    value: string, 
    regex: RegExp, 
    setState: (value: any) => void, 
    setValidity: (value: boolean) => void, 
    maxLength?: number) => {
    if(maxLength && value.length > maxLength){
        setState(value.slice(0, maxLength));
        setValidity(false);
        return;
    }
    setState(value);
    setValidity(regex.test(value));
};