class AppError extends Error {
    customErrorCode: any;
    metaData: any;
    httpCode: any;
    originalError: any;
  
    constructor(errorInfo: any, { message, originalError, metaData }: any = {}) {
      if (!errorInfo) {
        throw new Error('Invalid call to AppError');
      }
  
      super(message || errorInfo.message);
  
      this.customErrorCode = errorInfo.customErrorCode;
      this.metaData = metaData || {};
  
      if (errorInfo.httpCode) {
        this.httpCode = errorInfo.httpCode;
      }
  
      if (originalError) {
        this.originalError = originalError;
      }
    }
  }
  
  export default AppError;
  