export const handleFileChange = (
    setFile: (value: React.SetStateAction<File | Blob | undefined>
    ) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };