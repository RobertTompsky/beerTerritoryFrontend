export type UploadRequestData = {
    avatar: File | Blob | undefined;
};

// Определение типа данных для ответа от сервера
export type UploadResponseData = {
    filePath: string;
    fileName: string
};